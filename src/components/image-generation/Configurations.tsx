"use client"

import React, { useEffect } from 'react'
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
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from '../ui/textarea'
import { Info } from 'lucide-react'
import useGeneratedStore from '@/store/useGeneratedStore'

// prompt: "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
// go_fast: true,
// guidance: 3.5,
// megapixels: "1",
// num_outputs: 1,
// aspect_ratio: "1:1",
// output_format: "webp",
// output_quality: 80,
// prompt_strength: 0.8,
// num_inference_steps: 28

export const ImageGenerationFormSchema = z.object({
  model: z.string({
    required_error: 'Model is required!'
  }),
  prompt: z.string({
    required_error: 'Prompt is required'
  }),
  guidance: z.number({
    required_error: 'Guidance scale is required'
  }),
  num_outputs: z.number().min(1, {message: 'Number of outputs should be atleast 1.'}).max(4, {message: 'Number of output should be less than 4'}),
  aspect_ratio: z.string({
    required_error: 'Aspect ratio is required!'
  }),
  output_format: z.string({
    required_error: 'Output format is required!'
  }),
  output_quality: z.number().min(1, {message: 'output_quality should be atleast 1.'}).max(100, {message: 'output_quality should be less than 100'}),
  num_inference_steps: z.number().min(1, {message: 'num_inference_steps should be atleast 1.'}).max(50, {message: 'num_inference_steps should be less than 50'}),
})

const Configurations = () => {

    const generateImage = useGeneratedStore((state) => state.generateImage)
    // 1. Define your form.
    const form = useForm<z.infer<typeof ImageGenerationFormSchema>>({
        resolver: zodResolver(ImageGenerationFormSchema),
        defaultValues: {
        model: "black-forest-labs/flux-dev",
        prompt: "",
        guidance: 3.5,
        num_outputs: 1,
        output_format: "jpg",
        aspect_ratio: "1:1",
        output_quality: 80,
        num_inference_steps: 28,
    },
  })

  useEffect(() => {
    const subscription = form.watch((value, {name}) =>{
      if (name === 'model'){
        let newSteps;
        if(value.model === 'black-forest-labs/flux-schnell'){
          newSteps = 4
        } else {
          newSteps = 28
        }
        if (newSteps !== undefined){
          form.setValue('num_inference_steps', newSteps)
        }
      }
    })
    return () => subscription.unsubscribe()
  },[form])
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ImageGenerationFormSchema>) {
    // Do something with the form values.
    await generateImage(values)
    // ✅ This will be type-safe and validated.

    
  }

  return (
    <TooltipProvider>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className='grid gap-6 p-4 bg-background rounded-lg border'>
            <legend className='text-sm -ml-1 px-1 font-medium'>
                Settings
            </legend>
      <FormField
          control={form.control}
          name="model"
          render={({ field }) => (

            <FormItem>
              <FormLabel className='flex items-center gap-2'>Model
              <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>You can select any model from yhe dropdown menu</p>
                </TooltipContent>
              </Tooltip>
              </FormLabel>
              
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="black-forest-labs/flux-dev">Flux Dev</SelectItem>
                  <SelectItem value="black-forest-labs/flux-schnell">Flux Schnell</SelectItem>
                  {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="aspect_ratio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>Aspect Ratio
              <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Aspect ratio for the generated images</p>
                </TooltipContent>
              </Tooltip>
              </FormLabel>
              
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a aspect ratio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="21:9">21:9</SelectItem>
                  <SelectItem value="3:2">3:2</SelectItem>
                  <SelectItem value="2:3">2:3</SelectItem>
                  <SelectItem value="4:5">4:5</SelectItem>
                  <SelectItem value="5:4">5:4</SelectItem>
                  <SelectItem value="3:4">3:4</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="9:16">9:16</SelectItem>
                  <SelectItem value="9:21">9:21</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_outputs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>No. of Outputs
              <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Total no. of output images to generate</p>
                </TooltipContent>
              </Tooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" min={1} max={4} {...field} onChange={(event) => field.onChange(+event.target.value)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <FormField
          control={form.control}
          name="guidance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>Guidance
                <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Prompt Guidance for generated image</p>
                </TooltipContent>
              </Tooltip>
                </div>
                <span>{ field.value}</span>
              </FormLabel>
              <FormControl>
                <Slider defaultValue={[field.value]} min={0} max={10} step={0.5} onValueChange={value => field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="num_inference_steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>No. of Inference Steps
                <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Number of Denoising steps. Recommended range is 28-50 for dev model and 1-4 for schnell model.</p>
                </TooltipContent>
              </Tooltip>
                </div>
                <span>{ field.value}</span>
              </FormLabel>
              <FormControl>
                <Slider defaultValue={[field.value]} min={1} max={
                  form.getValues('model') === 'black-forest-labs/flux-schnell' ? 4:50
                } step={1} onValueChange={value => field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="output_quality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>Output Quality
                <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Desired Quality for generated image</p>
                </TooltipContent>
              </Tooltip>
                </div>
                <span>{ field.value}</span>
              </FormLabel>
              <FormControl>
                <Slider defaultValue={[field.value]} min={50} max={100} step={1} onValueChange={value => field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="output_format"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>Output Format
              <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Prompt Guidance for generated image</p>
                </TooltipContent>
              </Tooltip>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a aspect ratio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="webp">webp</SelectItem>
                  <SelectItem value="png">png</SelectItem>
                  <SelectItem value="jpg">jpg</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>Prompt
              <Tooltip>
                <TooltipTrigger><Info className='w-4 h-4' /></TooltipTrigger>
                <TooltipContent>
                <p>Prompt Guidance for generated image</p>
                </TooltipContent>
              </Tooltip>
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className='font-medium' type="submit">Generate</Button>
        </fieldset>
      </form>
    </Form>
    </TooltipProvider>
    )
}

export default Configurations