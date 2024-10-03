'use client'

import { WalletWidget } from '@/components'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { FloatingLabelTextarea } from '@/components/ui/floating-label-textarea'
import { Form } from '@/components/ui/form'
import { useChainSpecs } from '@/hooks'
import { cn } from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Project name must be at least 5 characters.',
  }),
  description: z.string().min(10, {
    message: 'Project description must be at least 10 characters.',
  }),
  twitterHandle: z.string().optional(),
  telegramHandle: z.string().optional(),
  websiteURL: z.string().optional(),
})

export function Propose() {
  const { showWalletWidget } = useChainSpecs()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
      <Card className="h-full grid grid-rows-[max-content_1fr_max-content]">
        <Card.Header>
          <Card.Title>Propose a Project</Card.Title>
          <Card.Description>
            Once you have proposed a project, it will be reviewed by the Rare
            Earth DAO community. If approved, you will be able to launch your
            project.
          </Card.Description>
        </Card.Header>
        <Card.Content
          className={cn(
            'pt-6',
            showWalletWidget ? 'flex' : 'grid grid-cols-2 gap-x-3'
          )}
        >
          {showWalletWidget ? (
            <h1 className="max-w-[400px] m-auto animate-pop">
              In order to propose a new project, you must have a wallet
              connected 💳
            </h1>
          ) : (
            <Form {...form}>
              <Form.Field
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <FloatingLabelInput label="Project Name" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="websiteURL"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <FloatingLabelInput label="Website URL" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <FloatingLabelInput label="Twitter Handle" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="telegramHandle"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <FloatingLabelInput label="Telegram Handle" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="description"
                render={({ field }) => (
                  <Form.Item className="col-span-2">
                    <Form.Control>
                      <FloatingLabelTextarea
                        label="Project Description"
                        {...field}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Form>
          )}
        </Card.Content>
        <Card.Footer>
          {showWalletWidget ? (
            <WalletWidget className="w-full" size={'lg'} />
          ) : (
            <Button className="w-full" size={'lg'} type="submit">
              Submit
            </Button>
          )}
        </Card.Footer>
      </Card>
    </form>
  )
}
