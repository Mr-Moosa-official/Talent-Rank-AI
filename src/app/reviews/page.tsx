import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="font-headline text-4xl md:text-5xl font-bold">What Our Customers Say</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Real stories from teams who transformed their hiring with TalentRank AI.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => {
                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                return (
                  <Card key={index} className="flex flex-col bg-card border-border/80">
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
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
