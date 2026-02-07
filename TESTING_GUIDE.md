# Testing Guide - Critical Issues Fixed

## ⚠️ IMPORTANT: You Must Generate a Fresh Landing Page

**Your current project has broken component names ("TamboMessageProvider") from before the fix.**

### Steps to Test Properly:

1. **Clear Current Design**
   - Click "Clear Preview" button in the preview section
   - Or click "New Project" in the Projects sidebar

2. **Generate Fresh Landing Page**
   - Use one of these prompts:
     ```
     Create a landing page for a fashion e-commerce store with hero section, 
     how it works process, feature grid, and call to action
     ```
   - Or click "Component Templates" and select a template

3. **Wait for Generation to Complete**
   - Components should have proper names like "HeroSection", "Process", "FeatureGrid"
   - NOT "TamboMessageProvider"

---

## Issue 1: Edit Modal Empty ✅ FIXED

### What Was Wrong:
- Your old project has components with name "TamboMessageProvider"
- These components have empty props `{}`
- Edit modal now shows a warning when props are empty

### How to Test:
1. Generate a fresh landing page (see above)
2. Hover over a component (should show proper name like "HeroSection")
3. Click "Edit" button
4. You should now see editable fields like:
   - headline (text)
   - subheadline (text)
   - buttonText (text)
   - buttonLink (text)
   - etc.

### What You'll See:
- **If props are empty**: Yellow warning box saying "This component has no editable properties"
- **If props exist**: List of editable fields with inputs

---

## Issue 2: Variations Not Applying ✅ FIXED

### What Was Fixed:
1. **Selection Reset**: When you close and reopen variations, selection now resets to first item
2. **Color Replacement**: Deep color replacement now works (from previous fix)
3. **Debug Logging**: Added console logs to track what's happening

### How to Test:
1. Generate a fresh landing page
2. Hover over a component with colors (like HeroSection)
3. Click "Variations" button
4. You'll see variations with different color schemes
5. Click on "Red color scheme" (it will be selected with blue border)
6. Click "Use Selected Variation" button
7. Component should update with red colors
8. Open variations again - should start with first variation selected

### What to Check in Console:
Open browser console (F12) and look for:
```
Generating variations for component: {name: "HeroSection", ...}
Generated variations: [...]
Applying variation at index: 1
Variation props: {...}
```

---

## Issue 3: Buttons Not Fitting ⚠️ KNOWN ISSUE

### Current Behavior:
- Buttons positioned at `top-4 right-4`
- May overlap with component content

### Workaround:
- Buttons only appear on hover
- They have dark background with backdrop blur
- Should be visible even over content

### If Still Problematic:
Let me know and I can:
1. Move buttons to bottom-right
2. Make them smaller
3. Add more spacing

---

## Issue 4: Exported Code ❌ BROKEN (Old Project)

### Why It's Broken:
Your exported code shows:
```tsx
export default function TamboMessageProvider0(props) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </section>
  );
}
```

This is because:
1. Component name is wrong ("TamboMessageProvider")
2. Component has no props
3. Exporter can't find the component in registry
4. Falls back to generic template

### How to Fix:
1. **Generate a fresh landing page** (critical!)
2. Export again
3. You should see proper components like:
```tsx
export default function HeroSection0(props: HeroSection0Props) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">{props.headline}</h1>
        ...
      </div>
    </section>
  );
}
```

---

## Testing Checklist

### Before Testing:
- [ ] Clear current design
- [ ] Generate fresh landing page
- [ ] Verify components have proper names (not "TamboMessageProvider")
- [ ] Open browser console (F12) for debug logs

### Test Edit Modal:
- [ ] Hover over component
- [ ] Click "Edit" button
- [ ] See editable fields (not empty)
- [ ] Change a value (e.g., headline text)
- [ ] See live preview update
- [ ] Click "Save Changes"
- [ ] Verify component updated in main preview

### Test Variations:
- [ ] Hover over component with colors
- [ ] Click "Variations" button
- [ ] See 7+ variations (3 color, 2 layout, 2 content)
- [ ] Click on a color variation (e.g., "Red color scheme")
- [ ] Verify it's selected (blue border, checkmark)
- [ ] Click "Use Selected Variation"
- [ ] Verify component colors changed
- [ ] Open variations again
- [ ] Verify selection reset to first item

### Test Export:
- [ ] Click "Export Code" button
- [ ] Choose "React + TypeScript"
- [ ] Download ZIP
- [ ] Extract and check files:
  - [ ] `package.json` exists
  - [ ] `page.tsx` exists
  - [ ] `components/` folder has proper component names
  - [ ] Component files have actual JSX code (not JSON.stringify)
- [ ] Try HTML export too
- [ ] Verify `index.html` has actual HTML (not `<pre>{}</pre>`)

---

## Debug Console Logs

### Edit Modal:
```
EditModal - component: {id: "...", name: "HeroSection", props: {...}}
EditModal - props: {headline: "...", subheadline: "...", ...}
EditModal - props keys: ["headline", "subheadline", "buttonText", ...]
```

### Variations:
```
Generating variations for component: {name: "HeroSection", ...}
Generated variations: [{id: "...", variationType: "color", ...}, ...]
Variation count: 7
Applying variation at index: 1
Variation props: {headline: "...", ...}
```

### If You See:
- `props: {}` - Component has no props (old project issue)
- `name: "TamboMessageProvider"` - Old project, need to regenerate
- `Generated variations: []` - Component type not supported for variations

---

## Common Issues

### "Preview not available" in Edit Modal
**Cause**: Component not found in registry (wrong name)  
**Fix**: Generate fresh landing page

### "This component has no editable properties"
**Cause**: Component props are empty  
**Fix**: Generate fresh landing page

### Variations don't change colors
**Cause**: Old project with wrong component structure  
**Fix**: Generate fresh landing page

### Export shows JSON.stringify
**Cause**: Component name is wrong, exporter can't find it  
**Fix**: Generate fresh landing page

---

## Quick Test Script

1. Open http://localhost:3000
2. Click "Clear Preview" if you have old content
3. Type: "Create a landing page for a SaaS app with hero, features, and pricing"
4. Click "Generate UI"
5. Wait for components to appear
6. Hover over first component → Click "Edit"
   - Should see fields, not empty
7. Close edit modal
8. Hover over first component → Click "Variations"
   - Should see 7+ variations
9. Click on "Purple color scheme"
10. Click "Use Selected Variation"
    - Should see colors change to purple
11. Click "Export Code" → React
12. Download and check files
    - Should have proper component names
    - Should have actual JSX code

---

## If Issues Persist

### Check Console for Errors:
- Open browser console (F12)
- Look for red errors
- Share the error messages

### Check Component Names:
- Hover over components
- Component label should show proper name (HeroSection, FeatureGrid, etc.)
- NOT "TamboMessageProvider"

### Check Network Tab:
- Open browser DevTools → Network tab
- Look for failed API calls
- Check if Tambo AI is responding

---

**Remember: The key to testing is generating a FRESH landing page!**

Your old project was saved before we fixed the component name extraction, so it has broken data.
