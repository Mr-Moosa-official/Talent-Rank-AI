import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "For small teams and startups getting started.",
      features: [
        "Up to 10 job postings",
        "AI Candidate Ranking",
        "Score Breakdowns",
        "Email Support",
      ],
      cta: "Choose Starter",
      popular: false,
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "For growing businesses that need more power.",
      features: [
        "Unlimited job postings",
        "Advanced Candidate Comparison",
        "CSV & PDF Exports",
        "Priority Support",
        "CRM Integration (coming soon)",
      ],
      cta: "Choose Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs.",
      features: [
        "Everything in Pro",
        "Custom Integrations",
        "Dedicated Account Manager",
        "API Access",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="font-headline text-4xl md:text-5xl font-bold">Find the Perfect Plan</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Choose the plan that fits your hiring needs. All plans come with our cutting-edge AI engine.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                  {tier.popular && <Badge className="absolute -top-3 right-4 bg-accent text-accent-foreground">Most Popular</Badge>}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="flex items-baseline pt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground ml-1">{tier.period}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-5 w-5 text-accent mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
