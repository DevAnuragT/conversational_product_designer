# Variation Application Debug Plan

## Issue Summary
User reports that:
1. Selecting "2-column layout" variation still shows 3 columns
2. After applying a variation, it disappears from the variations list
3. Color scheme variations may not be working

## Root Cause Analysis

### Type Mismatch Issue (FIXED)
The `FeatureGrid` component expects `columns` prop as a **string** ("2", "3", "4"), but the variation generator was creating variations with **number** values (2, 3, 4).

**Fix Applied:**
- Updated `variation-generator.ts` to use string values: `columns: '2'` instead of `columns: 2`
- Added type coercion: `String(component.props.columns || '3')` to ensure consistent comparison

### Variation Disappearing Issue
When the variations modal reopens, it regenerates variations based on the **current props**. If a variation was already applied, it won't appear again because the current state matches that variation.

**This is actually correct behavior** - you don't want to see "2-column layout" as an option if you're already using 2 columns.

## Debugging Added

### 1. Variation Generator (`variation-generator.ts`)
```typescript
console.log('FeatureGrid current columns:', currentCols, 'type:', typeof currentCols);
console.log('Adding 2-column variation:', variation);
```

### 2. Variation Selector (`VariationSelector.tsx`)
```typescript
console.log('=== APPLYING VARIATION ===');
console.log('Variation props:', JSON.stringify(variation.props, null, 2));
console.log('COLUMNS PROP:', variation.props.columns, 'type:', typeof variation.props.columns);
```

### 3. Design Store (`useDesignStore.ts`)
```typescript
console.log('=== STORE: UPDATE COMPONENT ===');
console.log('Old props:', JSON.stringify(state.components[index]?.props, null, 2));
console.log('New props:', JSON.stringify(props, null, 2));
```

### 4. FeatureGrid Component (`FeatureGrid.tsx`)
```typescript
console.log('=== FEATUREGRID RENDER ===');
console.log('columns prop:', columns, 'type:', typeof columns);
```

## Testing Instructions

### Test 1: Column Layout Variation
1. Generate a landing page with a FeatureGrid component
2. Click "Variations" on the FeatureGrid
3. Select "2-column layout" variation
4. Click "Use Selected Variation"
5. **Check console logs** for:
   - Variation generator: Should show `columns: '2'` (string)
   - Store update: Should show new props with `columns: '2'`
   - FeatureGrid render: Should show `columns prop: 2 type: string`
6. **Visual check**: Grid should now show 2 columns instead of 3

### Test 2: Color Scheme Variation
1. On any component, click "Variations"
2. Select a color scheme variation (e.g., "Purple color scheme")
3. Click "Use Selected Variation"
4. **Check console logs** for prop updates
5. **Visual check**: Colors should change throughout the component

### Test 3: Variation Persistence
1. Apply a variation (e.g., 2-column layout)
2. Click "Variations" again
3. **Expected behavior**: "2-column layout" should NOT appear (already applied)
4. **Should see**: "4-column layout" and other non-applied variations

## Expected Console Output

When applying 2-column layout variation:

```
=== APPLYING VARIATION ===
Selected index: 0
Variation ID: comp-xxx-layout-0
Variation type: layout
Variation description: 2-column layout
Variation props: {
  "columns": "2",
  ...other props
}
COLUMNS PROP: 2 type: string

=== STORE: UPDATE COMPONENT ===
Index: 0
Old props: { "columns": "3", ... }
New props: { "columns": "2", ... }

=== FEATUREGRID RENDER ===
columns prop: 2 type: string
colorScheme: blue-purple
```

## What to Look For

### ✅ Success Indicators
- Console shows `columns: '2'` (string) in variation props
- Store receives and saves the new props correctly
- FeatureGrid renders with correct columns value
- Visual layout changes to 2 columns
- Applied variation disappears from list (correct behavior)

### ❌ Failure Indicators
- Console shows `columns: 2` (number) instead of string
- Store update shows no change in props
- FeatureGrid still renders with 3 columns
- No visual change after applying variation
- Error messages in console

## Next Steps

1. **Test with the debugging enabled** - User should generate a page and try variations
2. **Share console logs** - If it still doesn't work, we need to see the exact console output
3. **Check for other issues**:
   - Is the component re-rendering after prop update?
   - Are there any React errors preventing updates?
   - Is the variation modal closing before the update completes?

## Additional Notes

### Why Variations Disappear
This is **intentional behavior**. The variation system:
1. Generates variations that are **different** from current state
2. When you apply a variation, it becomes the current state
3. Next time you open variations, it generates new options excluding the current state
4. This prevents showing "apply the same thing you already have"

### Type Safety Improvement Needed
The `columns` prop should be typed as `"2" | "3" | "4"` (string literal union) in the schema to prevent this type of bug in the future.
