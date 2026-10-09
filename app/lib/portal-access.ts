export type ModuleId = "beranda" | "informasi" | "regulasi" | "prosedur" | "lembaga" | "pks" | "akses" | "sandbox" | "monitoring" | "pengaduan";

const modules: ModuleId[] = ["beranda", "informasi", "regulasi", "prosedur", "lembaga", "pks", "akses", "sandbox", "monitoring", "pengaduan"];
export function isPublicModule(id: ModuleId) {
  return id === "beranda" || id === "monitoring" || id === "pengaduan";
}

export function canAccessModule(id: ModuleId, role?: "admin" | "user") {
  return isPublicModule(id) || role === "admin" || (role === "user" && (id === "pks" || id === "sandbox"));
}

export function requestedModule(search: string): ModuleId {
  const value = new URLSearchParams(search).get("layanan");
  return modules.find(id => id === value) || "beranda";
}
