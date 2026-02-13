import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle, GitCompare, FileText, UploadCloud } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/placeholder-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function Home() {
  const features = [
    {
      icon: <UploadCloud className="w-10 h-10 text-primary" />,
      title: "Seamless Uploads",
      description: "Easily upload job descriptions and candidate resumes in multiple formats (PDF, DOCX, TXT).",
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: "AI-Powered Ranking",
      description: "Our advanced AI analyzes, scores, and ranks candidates based on your specific job requirements.",
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "Detailed Breakdowns",
      description: "Go beyond the score with in-depth analysis of candidate strengths, weaknesses, and rationale.",
    },
     {
      icon: <GitCompare className="w-10 h-10 text-primary" />,
      title: "Compare Candidates",
      description: "Effortlessly compare top candidates side-by-side to make confident, data-driven decisions.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="container px-4 md:px-6">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Powered by Gemini</Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Hire Smarter, Not Harder.
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              TalentRank AI is the ultimate Applicant Tracking System that leverages cutting-edge AI to find the perfect candidate for any role, saving you time and effort.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Revolutionize Your Recruitment</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                From parsing resumes to providing deep analytical insights, TalentRank AI has you covered.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-background/50 border-border/50 hover:border-primary/50 hover:bg-background transition-all">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Loved by Leading Recruiters</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Don't just take our word for it. Here's what our clients have to say.
              </p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => {
                  const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                  return (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="flex flex-col h-full bg-card border-border/80">
                          <CardContent className="pt-6 flex-grow">
                            <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                          </CardContent>
                          <CardHeader className="flex-row items-center gap-4 pt-4">
                            {avatar && (
                              <Avatar>
                                <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Next Star?</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
              Join hundreds of companies streamlining their hiring process with AI. Start your free trial today.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">Try TalentRank AI Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
