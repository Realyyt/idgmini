 # Product Pages Update Guide

## Quick Update Pattern

To update any product page to use the new FlyersSection component, follow this pattern:

### 1. Update Imports
Replace:
```tsx
import { useState } from 'react';
import { [IconName], Download, ChevronLeft, ChevronRight } from 'lucide-react';
```

With:
```tsx
import { [IconName] } from 'lucide-react';
import FlyersSection from '../components/FlyersSection';
```

### 2. Remove Inline FlyersSection Function
Delete the entire `function FlyersSection({ flyers })` implementation (approximately 100+ lines)

### 3. Update FlyersSection Usage
Replace:
```tsx
<FlyersSection flyers={product.flyers} />
```

With:
```tsx
<FlyersSection flyers={product.flyers} productType="[product-key]" />
```

## Product Key Mapping

| Directory | Product Key |
|-----------|-------------|
| accident-insurance | accident-insurance |
| accidental-death | accidental-death |
| aca-marketplace | aca-marketplace |
| critical-illness | critical-illness |
| dental-vision | dental-vision |
| final-expense | final-expense |
| group-health | group-health |
| group-life | group-life |
| health-insurance | health-insurance |
| indexed-universal-life | indexed-universal-life |
| individual-family | individual-family |
| medicare-advantage | medicare-advantage |
| medicare-advantage-pdp | medicare-advantage-pdp |
| medicare-part-d | medicare-part-d |
| medicare-supplement | medicare-supplement |
| prescription-drug-plan | prescription-drug-plan |
| short-term-medical | short-term-medical |
| supplemental-health | supplemental-health |
| survivorship-life | survivorship-life |
| term-life | term-life |
| universal-life | universal-life |
| whole-life | whole-life |

## Completed Updates
✅ health-insurance/page.tsx
✅ term-life/page.tsx  
✅ accident-insurance/page.tsx
✅ whole-life/page.tsx

## Remaining Updates Needed
- [ ] accidental-death/page.tsx
- [ ] aca-marketplace/page.tsx
- [ ] critical-illness/page.tsx
- [ ] dental-vision/page.tsx
- [ ] final-expense/page.tsx
- [ ] group-health/page.tsx
- [ ] group-life/page.tsx
- [ ] indexed-universal-life/page.tsx
- [ ] individual-family/page.tsx
- [ ] medicare-advantage/page.tsx
- [ ] medicare-advantage-pdp/page.tsx
- [ ] medicare-part-d/page.tsx
- [ ] medicare-supplement/page.tsx
- [ ] prescription-drug-plan/page.tsx
- [ ] short-term-medical/page.tsx
- [ ] supplemental-health/page.tsx
- [ ] survivorship-life/page.tsx
- [ ] universal-life/page.tsx

## Automation Option

You can use find/replace in your editor:

**Find Pattern:**
```regex
import { useState } from 'react';\nimport { (.+), Download, ChevronLeft, ChevronRight } from 'lucide-react';
```

**Replace With:**
```tsx
import { $1 } from 'lucide-react';
import FlyersSection from '../components/FlyersSection';
```

Then manually:
1. Remove the inline FlyersSection function
2. Update the FlyersSection usage with the correct productType