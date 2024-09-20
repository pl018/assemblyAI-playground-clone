import AudioTranscribePlayground from "./assembly-ai-sidebar-playground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <AudioTranscribePlayground />
      </main>
    </div>
  );
}
