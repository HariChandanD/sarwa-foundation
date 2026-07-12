# Content Management

This folder contains all editable website content centralized in one location. To update any text, contact information, or navigation on the website, simply edit the appropriate file here.

## File Structure

### `organization.ts`
Contains all organization-related information:
- Organization name
- Tagline and mission statement
- Contact information (email, phone, address)
- Social media links
- Working hours

**Example:**
```typescript
export const organization = {
  name: 'Sarwa Foundation',
  email: 'contact@sarwafoundation.org',
  phone: '+91 98765 43210',
  // ... more fields
};
```

### `navigation.ts`
Defines the website navigation menu and CTA buttons:
- Main navigation menu items
- Call-to-action buttons (Donate, Volunteer)

**Example:**
```typescript
export const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    // ... more items
  ],
  cta: [
    { name: 'Donate', href: '/donate', variant: 'default' },
    // ... more CTAs
  ],
};
```

### `hero.ts`
Contains hero section content for all pages:
- Page titles
- Subtitles
- Descriptions
- CTA button text and links

**Example:**
```typescript
export const hero = {
  homepage: {
    title: 'Every Life Deserves Love and Care',
    subtitle: 'Join us in our mission...',
    primaryCTA: { text: 'Donate Now', href: '/donate' },
  },
  // ... more pages
};
```

### `stats.ts`
Statistics displayed across the website:
- Homepage statistics
- About page statistics

**Example:**
```typescript
export const stats = {
  homepage: [
    { value: '10,000+', label: 'Animals Rescued' },
    // ... more stats
  ],
};
```

### `about.ts`
About page specific content:
- Organization story
- Core values
- Team information

### `programs.ts`
Programs page content:
- List of all programs
- Program descriptions
- Program features

### `contact.ts`
Contact page content:
- Contact information
- Form field labels
- Reasons to contact

### `footer.ts`
Footer section content:
- Footer links (organized by category)
- Social media links
- Legal links
- Copyright text

## How to Edit Content

1. **Find the right file**: Identify which file contains the content you want to edit
2. **Edit the content**: Update the text, links, or values
3. **Save the file**: The changes will automatically reflect on the website
4. **Test locally**: Run `npm run dev` to preview changes
5. **Deploy**: Commit and push changes to deploy

## Important Notes

- **Do not change the structure**: Only edit the values, not the object keys or structure
- **Maintain quotes**: Use single quotes for strings in TypeScript
- **Escape apostrophes**: In JSX content, use `'` for apostrophes or use double quotes
- **Test after changes**: Always test locally before deploying
- **Keep backups**: Commit changes to Git for version control

## Example: Changing Organization Name

**Before:**
```typescript
export const organization = {
  name: 'Sarwa Foundation',
  // ...
};
```

**After:**
```typescript
export const organization = {
  name: 'Your NGO Name',
  // ...
};
```

This change will automatically update the organization name everywhere it appears on the website (header, footer, page titles, etc.).

## Need Help?

If you need to add new content fields or pages, contact the development team. The current structure supports all existing pages and can be extended as needed.