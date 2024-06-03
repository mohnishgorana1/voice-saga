"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import GeneratePodcast from "@/components/GeneratePodcast"
import { Loader } from "lucide-react"


const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];
const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(5)
})

function CreatePodcast() {
  const [imagePrompt, setImagePrompt] = useState("")
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageURL, setImageURL] = useState("")

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioURL, setAudioURL] = useState("")
  const [audioDuration, setAudioDuration] = useState(0)

  const [voicePrompt, setVoicePrompt] = useState("")
  const [voiceType, setVoiceType] = useState<string>("")

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className=''>
      <h1 className="text-2xl sm:text-3xl font-bold text-white-1 ">Create Podcast</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 w-full flex flex-col gap-5">
          {/* first part: NON-AI */}
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel>Podcast Title</FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="AI RadioCast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>
            <Select onValueChange={(value) => setVoiceType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select AI Voice" />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white focus:ring-orange-1">
                {
                  voiceCategories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize text-white-1 focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))
                }
              </SelectContent>
              {voiceType && (
                <audio
                  src={`/${voiceType}.mp3`}
                  autoPlay
                  className="hidden"
                />
              )}
            </Select>


            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5 ">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a short podcast description !" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <Separator className="bg-white-3 opacity-25" />

          {/* second part: AI */}

          <div className="flex flex-col mt-10">
            <GeneratePodcast
              audio={audioURL}
              setAudio={setAudioURL}
              setAudioDuration={setAudioDuration}
              setAudioStorageId={setAudioStorageId}
              voiceType={voiceType}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
            />
            <GenerateThumbnail />

            <div className="mt-10 w-full ">
              <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                {
                  !isSubmitting ?
                    (

                      'Submit & Publish Podcast'
                    ) :
                    (
                      <>
                        Submitting&nbsp;&nbsp;
                        <Loader size={20} className="animate-spin" />
                      </>
                    )
                }
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}


export default CreatePodcast