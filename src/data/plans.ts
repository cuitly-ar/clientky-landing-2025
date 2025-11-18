import type { Language } from '../i18n/translations';

export type PlanId = 'starter' | 'growth' | 'pro';

type MultilangText = {
  es: string;
  en: string;
};

type PlanComparison = {
  followers: MultilangText;
  likes: MultilangText;
  views: MultilangText;
  comments: MultilangText;
  bonus: MultilangText;
  reports: MultilangText;
  support: MultilangText;
};

type PlanDefinition = {
  id: PlanId;
  monthlyPrice: number;
  annualPrice: number;
  featured?: boolean;
  labels: MultilangText;
  descriptions: MultilangText;
  features: {
    es: string[];
    en: string[];
  };
  comparison: PlanComparison;
};

const planDefinitions: Record<PlanId, PlanDefinition> = {
  starter: {
    id: 'starter',
    monthlyPrice: 25,
    annualPrice: 250,
    labels: {
      es: 'Plan Starter',
      en: 'Starter Plan'
    },
    descriptions: {
      es: 'Ideal para creadores que recién comienzan.',
      en: 'Ideal for creators getting started.'
    },
    features: {
      es: [
        '500 seguidores reales por mes',
        '200 likes por publicación (hasta 10 posts)',
        '1.000 views en Reels',
        '+ Bono: 200 seguidores extra el primer mes',
        '+ Reposición garantizada 30 días',
        '+ Mini reporte mensual',
        '+ Sugerencias básicas de hashtags'
      ],
      en: [
        '500 real followers per month',
        '200 likes per post (up to 10 posts)',
        '1,000 Reel views',
        '+ Bonus: 200 extra followers on the first month',
        '+ 30-day replacement guarantee',
        '+ Mini monthly report',
        '+ Basic hashtag suggestions'
      ]
    },
    comparison: {
      followers: {
        es: '500/mes (+200 bono inicial)',
        en: '500/mo (+200 bonus month one)'
      },
      likes: {
        es: '200 likes/post (10 posts)',
        en: '200 likes/post (10 posts)'
      },
      views: {
        es: '1.000 views/mes',
        en: '1,000 views/mo'
      },
      comments: {
        es: '—',
        en: '—'
      },
      bonus: {
        es: 'Bono seguidores, reposición, hashtags básicos',
        en: 'Bonus followers, replacement, basic hashtags'
      },
      reports: {
        es: 'Mini reporte mensual',
        en: 'Mini monthly report'
      },
      support: {
        es: 'Soporte estándar',
        en: 'Standard support'
      }
    }
  },
  growth: {
    id: 'growth',
    monthlyPrice: 49,
    annualPrice: 490,
    featured: true,
    labels: {
      es: 'Plan Growth',
      en: 'Growth Plan'
    },
    descriptions: {
      es: 'Nuestro plan más elegido para crecer rápido.',
      en: 'Our most popular plan for fast growth.'
    },
    features: {
      es: [
        '2.000 seguidores reales / mes',
        '5.000 likes mensuales',
        '20.000 views mensuales',
        'Comentarios básicos',
        '+ 5.000 views extra el primer mes',
        '+ Informe mensual detallado',
        '+ Sugerencia de hashtags',
        '+ Soporte con prioridad'
      ],
      en: [
        '2,000 real followers / month',
        '5,000 likes every month',
        '20,000 monthly views',
        'Basic comments',
        '+ 5,000 extra views on the first month',
        '+ Detailed monthly report',
        '+ Hashtag suggestions',
        '+ Priority support'
      ]
    },
    comparison: {
      followers: {
        es: '2.000/mes',
        en: '2,000/mo'
      },
      likes: {
        es: '5.000 likes/mes',
        en: '5,000 likes/mo'
      },
      views: {
        es: '20.000 views/mes (+5.000 bono)',
        en: '20,000 views/mo (+5,000 bonus)'
      },
      comments: {
        es: 'Comentarios básicos',
        en: 'Basic comments'
      },
      bonus: {
        es: 'Views extra, hashtags sugeridos',
        en: 'Extra views, hashtag suggestions'
      },
      reports: {
        es: 'Informe mensual detallado',
        en: 'Detailed monthly report'
      },
      support: {
        es: 'Soporte con prioridad',
        en: 'Priority support'
      }
    }
  },
  pro: {
    id: 'pro',
    monthlyPrice: 99,
    annualPrice: 990,
    labels: {
      es: 'Plan Pro',
      en: 'Pro Plan'
    },
    descriptions: {
      es: 'Máxima velocidad para creadores y marcas exigentes.',
      en: 'Maximum velocity for demanding creators and brands.'
    },
    features: {
      es: [
        '5.000 seguidores reales por mes',
        '15.000 likes mensuales',
        '50.000 views garantizadas',
        'Comentarios premium',
        'Prioridad máxima',
        '+ 1.000 seguidores extra el primer mes',
        '+ Entrega ultra rápida',
        '+ Garantía de engagement mínimo'
      ],
      en: [
        '5,000 real followers per month',
        '15,000 monthly likes',
        '50,000 guaranteed views',
        'Premium comments',
        'Maximum priority',
        '+ 1,000 extra followers on the first month',
        '+ Ultra fast delivery',
        '+ Minimum engagement guarantee'
      ]
    },
    comparison: {
      followers: {
        es: '5.000/mes (+1.000 bono)',
        en: '5,000/mo (+1,000 bonus)'
      },
      likes: {
        es: '15.000 likes/mes',
        en: '15,000 likes/mo'
      },
      views: {
        es: '50.000 views garantizadas',
        en: '50,000 guaranteed views'
      },
      comments: {
        es: 'Comentarios premium',
        en: 'Premium comments'
      },
      bonus: {
        es: 'Entrega ultra rápida, garantía engagement',
        en: 'Ultra fast delivery, engagement guarantee'
      },
      reports: {
        es: 'Reporte ejecutivo + insights',
        en: 'Executive report + insights'
      },
      support: {
        es: 'Prioridad máxima',
        en: 'Top-tier priority'
      }
    }
  }
};

export type PlanContent = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  featured?: boolean;
  description: string;
  features: string[];
  comparison: Record<keyof PlanComparison, string>;
};

export function getPlans(lang: Language): PlanContent[] {
  return Object.values(planDefinitions).map((plan) => ({
    id: plan.id,
    name: plan.labels[lang],
    monthlyPrice: plan.monthlyPrice,
    annualPrice: plan.annualPrice,
    featured: plan.featured,
    description: plan.descriptions[lang],
    features: plan.features[lang],
    comparison: {
      followers: plan.comparison.followers[lang],
      likes: plan.comparison.likes[lang],
      views: plan.comparison.views[lang],
      comments: plan.comparison.comments[lang],
      bonus: plan.comparison.bonus[lang],
      reports: plan.comparison.reports[lang],
      support: plan.comparison.support[lang]
    }
  }));
}

export function getPlanById(lang: Language, id: PlanId): PlanContent | undefined {
  const def = planDefinitions[id];
  if (!def) return undefined;
  return {
    id: def.id,
    name: def.labels[lang],
    monthlyPrice: def.monthlyPrice,
    annualPrice: def.annualPrice,
    featured: def.featured,
    description: def.descriptions[lang],
    features: def.features[lang],
    comparison: {
      followers: def.comparison.followers[lang],
      likes: def.comparison.likes[lang],
      views: def.comparison.views[lang],
      comments: def.comparison.comments[lang],
      bonus: def.comparison.bonus[lang],
      reports: def.comparison.reports[lang],
      support: def.comparison.support[lang]
    }
  };
}

export function getPlanDefinition(id: PlanId): PlanDefinition | undefined {
  return planDefinitions[id];
}

