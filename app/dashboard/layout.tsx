import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="space-y-4">
        <Navbar />
        <section className="px-5">
          <div>{children}</div>
        </section>
      </main>
    </>
  );
}
