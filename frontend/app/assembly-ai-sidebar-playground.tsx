import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AudioTranscribePlayground() {
  return (
    <div className="container mx-auto p-4 text-gray-200">
      <div className="flex justify-end items-center mb-6">

        <div className="space-x-4">
          <Button variant="ghost" className="text-gray-200 hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white">API Docs</Button>
          <Button variant="ghost" className="text-gray-200 hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white">Contact sales</Button>
          <Button variant="default" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-80">Go to your dashboard</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-80 shrink-0 bg-card-background text-gray-200">
          <CardContent className="p-4">
            <Tabs defaultValue="audio-file" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 bg-input-background border border-purple-600 rounded-lg overflow-hidden">
                <TabsTrigger value="audio-file" className="data-[state=active]:bg-gradient-to-r from-pink-500 to-purple-600 data-[state=active]:text-white border-r border-purple-600">Audio File</TabsTrigger>
                <TabsTrigger value="streaming" className="data-[state=active]:bg-gradient-to-r from-pink-500 to-purple-600 data-[state=active]:text-white">Streaming</TabsTrigger>
              </TabsList>
              <TabsContent value="audio-file">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="audio-file" className="text-gray-200">Upload audio file to transcribe:</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="audio-file"
                        accept="audio/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="audio-file"
                        className="cursor-pointer bg-input-background border border-purple-600 text-gray-200 rounded-lg px-4 py-2 inline-block hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white transition-all duration-300"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-200">Model Tier</Label>
                    <RadioGroup defaultValue="best" className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="best" id="best-audio" className="border-0 ring-2 ring-pink-500 ring-offset-2 ring-offset-background data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 outline outline-2 outline-purple-600" />
                        <Label htmlFor="best-audio" className="text-gray-300">Best</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nano" id="nano-audio" className="border-0 ring-2 ring-pink-500 ring-offset-2 ring-offset-background data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 outline outline-2 outline-purple-600" />
                        <Label htmlFor="nano-audio" className="text-gray-300">Nano</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-200">Select additional capabilities (optional)</Label>
                    {[
                      "LeMUR", "Summarization", "Topic Detection", "Auto Chapters",
                      "Content Moderation", "Important Phrases", "Sentiment Analysis",
                      "Entity Detection", "PII Redaction", "Speaker Labels"
                    ].map((capability) => (
                      <div key={capability} className="flex items-center justify-between">
                        <Label htmlFor={`${capability}-audio`} className="text-sm text-gray-300">{capability}</Label>
                        <Switch 
                          id={`${capability}-audio`} 
                          className="border border-purple-600 bg-transparent data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 data-[state=unchecked]:bg-transparent"
                        />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-80">Transcribe file</Button>
                </div>
              </TabsContent>
              <TabsContent value="streaming">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="streaming-url" className="text-gray-200">Enter streaming URL:</Label>
                    <input
                      type="text"
                      id="streaming-url"
                      className="w-full mt-2 bg-transparent border border-purple-600 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white transition-all duration-300"
                      placeholder="https://example.com/stream"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-200">Model Tier</Label>
                    <RadioGroup defaultValue="best" className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="best" id="best-streaming" className="border-1 ring-2 ring-pink-500 ring-offset-2 ring-offset-background data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 outline outline-2 outline-gray-300" />
                        <Label htmlFor="best-streaming" className="text-gray-300">Best</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nano" id="nano-streaming" className="border-0 ring-2 ring-pink-500 ring-offset-2 ring-offset-background data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 outline outline-2 outline-gray-300" />
                        <Label htmlFor="nano-streaming" className="text-gray-300">Nano</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-200">Select additional capabilities (optional)</Label>
                    {[
                      "LeMUR", "Summarization", "Topic Detection", "Auto Chapters",
                      "Content Moderation", "Important Phrases", "Sentiment Analysis",
                      "Entity Detection", "PII Redaction", "Speaker Labels"
                    ].map((capability) => (
                      <div key={capability} className="flex items-center justify-between">
                        <Label htmlFor={`${capability}-streaming`} className="text-sm text-gray-300">{capability}</Label>
                        <Switch 
                          id={`${capability}-streaming`} 
                          className="border border-purple-600 bg-transparent data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-600 data-[state=unchecked]:bg-transparent"
                        />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-80">Start streaming</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="flex-grow bg-card-background">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Try AssemblyAI&apos;s API in seconds</CardTitle>
            <p className="text-gray-300">
              Access production-ready Speech AI models for speech recognition, speaker detection, audio summarization, and more. Test our API yourself with a pre-loaded audio file, or upload your own.
            </p>
          </CardHeader>
          <CardContent>
            {/* Placeholder for transcription results or additional content */}
            <div className="h-96 bg-input-background rounded-lg flex items-center justify-center text-gray-300">
              Transcription results will appear here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
