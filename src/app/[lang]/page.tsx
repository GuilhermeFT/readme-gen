import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Github } from '@/components/icons/github'
import { MacWindow } from '@/components/landing/mac-window'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/dictionary'

import { Pages } from '@/types/pages'
import { ArrowRight, Award, Clock, Code } from 'lucide-react'
import Link from 'next/link'

export default async function Home(props: Pages) {
  const params = await props.params

  const { lang } = params

  const dictionary = await getDictionary(lang)

  return (
    <>
      <Header lang={lang} />
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <section className="from-background to-muted w-full bg-gradient-to-b py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {dictionary.landingPage.hero.welcomeTo}{' '}
                    <span className="text-primary">ReadmeGen</span>
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    {dictionary.landingPage.hero.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href={`/${lang}/login`}>
                    <Button size="lg" className="gap-2">
                      {dictionary.landingPage.hero.callToActionOne}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href={`/${lang}/login`}>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Github className="h-4 w-4" />
                      {dictionary.landingPage.hero.callToActionTwo}
                    </Button>
                  </Link>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{dictionary.landingPage.hero.sloganOne}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <span>{dictionary.landingPage.hero.SloganTwo}</span>
                  </div>
                </div>
              </div>

              <MacWindow dict={dictionary} />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-background w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
                  {dictionary.landingPage.whySection.preTitle}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {dictionary.landingPage.whySection.title}
                </h2>
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dictionary.landingPage.whySection.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="bg-background flex h-full flex-col space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Clock className="text-primary h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {dictionary.landingPage.whySection.cards.at(0)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dictionary.landingPage.whySection.cards.at(0)?.description}
                  </p>
                </div>
              </div>
              <div className="bg-background flex h-full flex-col space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Award className="text-primary h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {dictionary.landingPage.whySection.cards.at(1)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dictionary.landingPage.whySection.cards.at(1)?.description}
                  </p>
                </div>
              </div>
              <div className="bg-background flex h-full flex-col space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Github className="text-primary h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {dictionary.landingPage.whySection.cards.at(2)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dictionary.landingPage.whySection.cards.at(2)?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="bg-muted w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
                  {dictionary.landingPage.howItWorks.preTitle}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {dictionary.landingPage.howItWorks.title}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {dictionary.landingPage.howItWorks.steps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center space-y-4 text-center"
                >
                  <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                    {i + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href={`/${lang}/login`}>
                <Button size="lg" className="gap-2">
                  {dictionary.landingPage.howItWorks.callToAction}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-background w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
                    {dictionary.landingPage.testimonialSection.preTitle}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    {dictionary.landingPage.testimonialSection.title}
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {dictionary.landingPage.testimonialSection.description}
                  </p>
                </div>
                <div className="space-y-4">
                  {dictionary.landingPage.testimonialSection.testimonials.map(
                    (testimonial) => (
                      <div
                        key={testimonial.user}
                        className="rounded-lg border p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Code className="text-primary h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              {testimonial.testimonial}
                            </p>
                            <p className="mt-2 text-sm font-medium">
                              - {testimonial.user}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
                    {dictionary.landingPage.faqSection.preTitle}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    {dictionary.landingPage.faqSection.title}
                  </h2>
                </div>
                <div className="space-y-4" id="faq">
                  {dictionary.landingPage.faqSection.questions.map(
                    (question) => (
                      <div
                        key={question.question}
                        className="rounded-lg border p-4"
                      >
                        <h3 className="text-lg font-medium">
                          {question.question}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {question.answer}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {dictionary.landingPage.callToActionSection.title}
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dictionary.landingPage.callToActionSection.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={`/${lang}/login`}>
                  <Button size="lg" variant="secondary" className="gap-2">
                    {dictionary.landingPage.callToActionSection.buttonOne}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href={`/${lang}/login`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 gap-2 bg-transparent"
                  >
                    <Github className="h-4 w-4" />
                    {dictionary.landingPage.callToActionSection.buttonTwo}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dictionary} />
    </>
  )
}
