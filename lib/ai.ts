import type { StudentProfile, JobPost } from './types';

/**
 * Extracts keywords from a job description
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set(['the', 'and', 'or', 'to', 'a', 'of', 'for', 'in', 'on', 'with', 'is', 'are', 'be', 'as', 'at', 'by', 'an', 'will', 'you', 'your', 'we', 'our', 'they', 'this', 'that', 'from', 'have', 'has', 'had', 'it', 'its', 'not', 'but', 'if', 'when', 'which', 'who', 'what', 'where', 'how']);
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  return Array.from(new Set(words)).filter(w => !stopWords.has(w)).slice(0, 30);
}

/**
 * Tailors resume bullets to match job keywords (mock AI)
 */
export function tailorResume(profile: StudentProfile, job: JobPost): string {
  const keywords = extractKeywords(job.description);
  const bullets = profile.experience
    .split('\n')
    .filter(l => l.trim())
    .map(b => b.trim());

  const tailored = bullets.map(bullet => {
    const k = keywords.find(kw =>
      bullet.toLowerCase().includes(kw)
    ) || keywords[0] || 'impact';
    return `• ${bullet} (${k}-focused alignment with ${job.title} role)`;
  });

  return [
    `# ${profile.name}`,
    `${profile.email} | ${profile.phone}`,
    `Target: ${job.title} at ${job.company}`,
    ``,
    `## Experience`,
    ...tailored,
    ``,
    `## Skills`,
    profile.skills.split(',').map(s => `• ${s.trim()}`).join('\n'),
  ].join('\n');
}

/**
 * Generates a cover letter from profile + job (mock AI)
 */
export function generateCoverLetter(profile: StudentProfile, job: JobPost): string {
  return [
    `${profile.name}`,
    `${profile.email} | ${profile.phone}`,
    `${job.company} — ${job.title}`,
    ``,
    `Dear ${job.company} Hiring Team,`,
    ``,
    `I'm writing to express my enthusiasm for the ${job.title} position. As a ${profile.degree} candidate from ${profile.university} (Class of ${profile.graduationYear}), I've developed strong skills in ${profile.targetRole}, and I'm eager to bring my background in ${profile.skills.split(',')[0].trim()} to your team.`,
    ``,
    `What draws me to ${job.company} is the opportunity described in the role: working on meaningful projects that align with my passion for ${profile.targetIndustry}. My experience has prepared me to contribute from day one.`,
    ``,
    `I'm excited about the possibility of collaborating with ${job.company} and would welcome the chance to discuss how my background fits your needs.`,
    ``,
    `Warm regards,`,
    `${profile.name}`,
  ].join('\n');
}

/**
 * Generates interview Q&A based on job post (mock AI)
 */
export function generateInterviewPrep(profile: StudentProfile, job: JobPost): string {
  const keywords = extractKeywords(job.description);
  const topSkills = keywords.slice(0, 5).join(', ');

  return [
    `# Interview Prep — ${job.title} at ${job.company}`,
    ``,
    `## Likely Technical Questions`,
    ``,
    `**Q: Tell us about your experience with ${topSkills || 'the key skills in this role'}.**`,
    `A: I have hands-on experience with ${profile.skills.split(',')[0].trim()}. During my time at ${profile.university}, I worked on projects involving ${profile.experience.split('\n')[0]?.trim() || 'relevant coursework'}. I'm confident in my ability to apply these skills to ${job.description.slice(0, 80)}...`,
    ``,
    `**Q: Why do you want to work at ${job.company}?**`,
    `A: ${job.company} is leading in the ${profile.targetIndustry} space. I'm drawn to the opportunity to work on ${topSkills} and contribute to a mission-driven team.`,
    ``,
    `**Q: Where do you see yourself in 3 years?**`,
    `A: Growing into a senior contributor on the ${profile.targetRole} team, developing deep expertise in ${topSkills}, and taking on increasing responsibility.`,
    ``,
    `## Behavioral Questions`,
    ``,
    `**Q: Tell me about a time you worked on a difficult team project.**`,
    `A: During university, I collaborated on a group project where we had tight deadlines. I took the initiative to coordinate via daily standups, which helped us deliver on time and earn strong feedback.`,
    ``,
    `**Q: How do you handle feedback?**`,
    `A: I welcome feedback as a growth signal. I ask clarifying questions, implement the feedback promptly, and circle back to show progress.`,
    ``,
    `## Questions to Ask the Interviewer`,
    ``,
    `• What does a typical first week look like for someone in this role?`,
    `• How does the team measure success in the first 90 days?`,
    `• What's the biggest challenge someone in this role would face in the first month?`,
  ].join('\n');
}

/**
 * Parses a raw job description text into structured format
 */
export function parseJobPost(raw: string): JobPost {
  const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const titleMatch = raw.match(/(?:title|position|role)[:\s]*([^\n]+)/i);
  const companyMatch = raw.match(/company[:\s]*([^\n]+)/i);
  const locationMatch = raw.match(/location[:\s]*([^\n]+)/i);

  return {
    title: titleMatch?.[1] || lines[0] || 'Unknown Role',
    company: companyMatch?.[1] || lines[1] || 'Unknown Company',
    location: locationMatch?.[1] || '',
    description: raw,
  };
}
