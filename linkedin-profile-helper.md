# How to Get Your LinkedIn Profile Picture URL

## Method 1: Direct LinkedIn URL (Recommended)
1. Go to your LinkedIn profile: https://www.linkedin.com/in/muhammad-umar-802235286/
2. Right-click on your profile picture
3. Select "Copy image address" or "Copy image URL"
4. The URL will look something like: `https://media.licdn.com/dms/image/D4D03AQF8QZ8QZ8QZ8Q/profile-displayphoto-shrink_400_400/0/1703123456789?e=1721865600&v=beta&t=your-actual-image-url`

## Method 2: Using LinkedIn API
If you want to use a more reliable method, you can use LinkedIn's API or a service like:
- LinkedIn Profile Picture API
- Gravatar (if you have one set up)

## Method 3: Upload to Your Project
1. Download your profile picture from LinkedIn
2. Save it in your project's `public` folder
3. Use the local path: `/your-image-name.jpg`

## Current Implementation
I've added a ProfilePicture component that:
- Shows your LinkedIn profile picture when the URL is correct
- Falls back to a nice placeholder with your initials "MU" if the image fails to load
- Has a professional design with subtle glow effects
- Includes a status indicator showing you're available

## To Update Your Profile Picture:
1. Get your LinkedIn profile picture URL using Method 1 above
2. Replace the placeholder URL in `src/components/Portfolio/HeroSection.tsx` on line 99
3. The URL should be in the `src` prop of the ProfilePicture component

## Example:
```tsx
<ProfilePicture 
  src="YOUR_ACTUAL_LINKEDIN_IMAGE_URL_HERE"
  alt="Muhammad Umar - Flutter Developer"
  className="mb-6"
/>
```

The component is already integrated and will show a beautiful placeholder until you add your actual image URL!

