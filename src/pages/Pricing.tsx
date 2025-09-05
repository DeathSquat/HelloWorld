import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  BookOpen,
  Award,
  Users,
  Infinity,
  Clock,
  Shield
} from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free Explorer',
      description: 'Perfect for getting started with coding',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: BookOpen,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      features: [
        'Access to 3 programming languages',
        '5 roadmaps per month',
        'Basic progress tracking',
        'Community forum access',
        'Mobile app access',
        'Basic certificates'
      ],
      limitations: [
        'Limited to 10 hours of content per month',
        'No priority support',
        'Ads supported'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro Developer',
      description: 'For serious learners who want unlimited access',
      monthlyPrice: 29,
      yearlyPrice: 290, // ~$24/month
      icon: Zap,
      color: 'text-golden',
      bgColor: 'bg-golden/10',
      borderColor: 'border-golden/20',
      features: [
        'Unlimited access to all languages',
        'Unlimited roadmaps',
        'Advanced progress analytics',
        'Priority support',
        'Ad-free experience',
        'Verified certificates',
        'Live coding sessions',
        'Project reviews',
        '1-on-1 mentoring sessions (2/month)'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      trialDays: 7
    },
    {
      name: 'Enterprise Master',
      description: 'For teams and organizations',
      monthlyPrice: 99,
      yearlyPrice: 990, // ~$82.5/month
      icon: Crown,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Custom learning paths',
        'API access',
        'White-label solution',
        'Advanced analytics & reporting',
        'Custom integrations',
        'Dedicated account manager',
        'Unlimited 1-on-1 sessions',
        'Custom certificates',
        'Priority feature requests'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      teamSize: 'Up to 50 users'
    }
  ];

  const bonusFeatures = [
    {
      icon: Award,
      title: 'Point System',
      description: 'Earn points for completing lessons, projects, and challenges'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join thousands of developers in our active learning community'
    },
    {
      icon: Shield,
      title: 'Lifetime Access',
      description: 'Keep access to your completed courses forever'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock support'
    }
  ];

  const getPrice = (plan: any) => {
    if (plan.monthlyPrice === 0) return 'Free';
    const price = isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice;
    return `$${Math.round(price)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your <span className="text-golden">Learning Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start coding for free, or unlock unlimited learning with our Pro and Enterprise plans
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-golden"
            />
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-golden/20 text-golden border-golden/30">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? `${plan.borderColor} shadow-xl shadow-golden/10` 
                    : 'border-border/50 hover:border-accent/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-golden text-primary-foreground px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${plan.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        {getPrice(plan)}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-muted-foreground ml-1">
                          /{isYearly ? 'month' : 'month'}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed ${plan.yearlyPrice} annually
                      </p>
                    )}
                    {plan.teamSize && (
                      <p className="text-sm text-golden mt-1">{plan.teamSize}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-border/30">
                      <p className="text-xs text-muted-foreground font-medium">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          • {limitation}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-golden hover:bg-golden/90 text-primary-foreground' 
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                    {plan.trialDays && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        {plan.trialDays}-day free trial, cancel anytime
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bonus Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            What Makes Hello World Special?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonusFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/30 text-center">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-golden mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Point System Explanation */}
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20 mb-16">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-golden" />
              <h2 className="text-2xl font-bold text-foreground">Point & Rewards System</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Earn points for every lesson completed, project submitted, and milestone achieved. 
              Redeem points for premium content, certificates, and exclusive merchandise!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-golden">100</div>
                <p className="text-sm text-muted-foreground">Points per lesson</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-golden">500</div>
                <p className="text-sm text-muted-foreground">Points per project</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-golden">1000</div>
                <p className="text-sm text-muted-foreground">Points per certificate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-8">
            Have questions? We're here to help you choose the right plan.
          </p>
          <Button variant="outline" size="lg">
            View All FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;