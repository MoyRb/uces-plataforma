import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../../utils";

type Params = { params: Promise<{ id: string }> };

const normalizeStatus = (value: unknown): "open" | "closed" | "draft" => {
  if (value === "closed" || value === "draft") return value;
  return "open";
};

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const title = toNullableText(body?.title);
  if (!title) return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });

  const payload = {
    module_id: toNullableText(body?.module_id),
    title,
    schedule: toNullableText(body?.schedule),
    location: toNullableText(body?.location),
    description: toNullableText(body?.description),
    requirements: toNullableText(body?.requirements),
    status: normalizeStatus(body?.status),
  };

  const response = await admin.supabase.from("vacancies").update(payload).eq("id", id).select("*").single();

  if (response.error) return NextResponse.json({ error: response.error.message || "No se pudo actualizar la vacante" }, { status: 400 });

  return NextResponse.json({ data: response.data });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data: assessments, error: assessmentsError } = await admin.supabase.from("assessments").select("id").eq("vacancy_id", id);
  if (assessmentsError) {
    return NextResponse.json({ error: "No se pudo validar la evaluación asociada" }, { status: 400 });
  }

  const assessmentIds = (assessments ?? []).map((assessment) => assessment.id);

  if (assessmentIds.length > 0) {
    const { count, error: attemptsError } = await admin.supabase
      .from("attempts")
      .select("id", { head: true, count: "exact" })
      .in("assessment_id", assessmentIds);

    if (attemptsError) {
      return NextResponse.json({ error: "No se pudo validar intentos asociados" }, { status: 400 });
    }

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar: existen intentos registrados. Puedes cerrar la vacante o cambiar status." },
        { status: 409 },
      );
    }
  }

  const { error } = await admin.supabase.from("vacancies").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message || "No se pudo eliminar la vacante" }, { status: 400 });

  return NextResponse.json({ ok: true });
}
