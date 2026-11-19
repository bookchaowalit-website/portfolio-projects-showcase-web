import { ShowcaseView } from "@/components/showcase-view";
import { PROJECTS, parseView } from "@/lib/projects";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  return <ShowcaseView projects={PROJECTS} query={one(params.q).trim().slice(0, 80)} view={parseView(one(params.view))} />;
}
