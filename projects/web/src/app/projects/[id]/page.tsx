"use strict";

import React from "react";
import ProjectDetailPage from "@/modules/projects/infrastructure/ui/ProjectDetailPage";

interface Params {
  params: { id: string };
}

export default function ProjectPage({ params }: Params) {
  const projectId: number = Number(params.id);
  return <ProjectDetailPage projectId={projectId} />;
}
