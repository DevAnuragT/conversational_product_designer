# Fix Summary - Same Page Issue

## Problem
User was getting the same landing page (fashion e-commerce) for every new prompt.

## Root Cause
The `useTamboThread()` hook maintains a persistent thread across generations. When generating a new landing page:
1. Old thread messages were still present
2. The `useEffect` that extracts components was looking at ALL messages after the last user message
3. This meant it kept showing components from the first generation
4. Even though new components were generated, the old ones were being displayed

## Solution Applied

### 1. Clear Components Before Generation
```typescript
const handleGenerate = async () => {
  // Clear existing components before generating new ones
  console.log('Clearing existing components before new generation');
  setComponents([]);
  
  // Then generate new content
  await sendThreadMessage(finalPrompt, { streamResponse: true });
};
```

### 2. Start New Thread on Clear/New Project
```typescript
// Added startNewThread to the hook destructuring
const { sendThreadMessage, generationStage, isIdle, thread, startNewThread } = useTamboThread();

// Created wrapper function for new project
const handleNewProject = async () => {
  clearDesign();
  if (startNewThread) {
    await startNewThread();
    console.log('Started new thread for new project');
  }
};

// Updated Clear Preview button
<button onClick={async () => {
  if (confirm('Clear current design?')) {
    clearDesign();
    if (startNewThread) {
      await startNewThread();
      console.log('Started new thread');
    }
  }
}}>
  Clear Preview
</button>
```

### 3. Optimized useEffect Dependency
```typescript
// Changed from [thread] to [thread?.messages?.length]
// Only re-runs when message count changes, not on every thread update
useEffect(() => {
  // Extract components logic
}, [thread?.messages?.length]);
```

## How It Works Now

### Scenario 1: Generate New Landing Page
1. User types new prompt
2. Clicks "Generate UI"
3. `handleGenerate()` clears existing components
4. Sends new message to thread
5. New components are extracted and displayed
6. Old components are gone

### Scenario 2: Clear Preview
1. User clicks "Clear Preview"
2. Confirms the action
3. `clearDesign()` clears components from store
4. `startNewThread()` creates fresh thread
5. Old conversation is discarded
6. Ready for new generation

### Scenario 3: New Project
1. User clicks "New Project" in sidebar
2. `handleNewProject()` is called
3. Clears design and starts new thread
4. Fresh slate for new project

## Testing Instructions

### Test 1: Multiple Generations
1. Generate a landing page with prompt: "Create a fashion store landing page"
2. Wait for it to complete
3. Type new prompt: "Create a healthcare landing page"
4. Click "Generate UI"
5. **Expected**: Should see healthcare components, NOT fashion components

### Test 2: Clear and Regenerate
1. Generate any landing page
2. Click "Clear Preview"
3. Confirm
4. Type a completely different prompt
5. Generate
6. **Expected**: Should see new components matching the new prompt

### Test 3: New Project
1. Generate a landing page
2. Click "New Project" in Projects sidebar
3. Type a new prompt
4. Generate
5. **Expected**: Should see new components, old ones gone

## Debug Logging

Added console logs to track the flow:
- "Clearing existing components before new generation"
- "Started new thread"
- "Started new thread for new project"
- "Extracted components from thread: [...]"

Check browser console (F12) to see these logs and verify the fix is working.

## Files Modified
- `tambo/app/page.tsx`
  - Added `startNewThread` to hook destructuring
  - Clear components before generation
  - Created `handleNewProject` wrapper
  - Updated Clear Preview button
  - Optimized useEffect dependency

## Commit
```
fix: clear components before generation and start new thread to prevent reusing old conversation
```

## Status
✅ **FIXED** - Each new generation now creates fresh components instead of reusing old ones.

---

**Now you can generate different landing pages with different prompts!**
