"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Education, Certification } from "@/types";

interface Props {
  education: Education[];
  certifications: Certification[];
}

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] as const },
});

export function EducationClient({ education, certifications }: Props) {
  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-96 cyber-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          as="h1"
          label="~/education"
          title="Education & Certifications"
          description="My academic background and professional certifications"
        />

        <section className="mb-20" aria-labelledby="education-heading">
          <div className="flex items-center gap-4 mb-8">
            <IconBox size="lg">
              <GraduationCap strokeWidth={1.5} />
            </IconBox>
            <h2 id="education-heading" className="text-2xl md:text-3xl text-foreground">Education</h2>
            <div aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div key={edu.id} {...reveal(index)} className="cyber-glow-wrap">
                <Card variant="terminal" terminalTitle={`degree_${String(index + 1).padStart(2, "0")}.dat`} hoverEffect className="h-full px-6 gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg md:text-xl text-foreground">{edu.degree}</h3>
                    <Badge variant="secondary">{edu.duration}</Badge>
                  </div>
                  <p className="font-label uppercase tracking-[0.15em] text-accent-tertiary">@ {edu.institution}</p>
                  <p className="text-foreground/80 leading-relaxed">{edu.description}</p>
                  {edu.gpa && (
                    <p className="font-mono text-sm mt-auto">
                      <span className="text-muted-foreground">gpa =</span>{" "}
                      <span className="text-accent text-glow">{edu.gpa}</span>
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="certs-heading">
          <div className="flex items-center gap-4 mb-8">
            <IconBox size="lg" tone="secondary">
              <Award strokeWidth={1.5} />
            </IconBox>
            <h2 id="certs-heading" className="text-2xl md:text-3xl text-foreground">Certifications</h2>
            <div aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent-secondary/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div key={cert.id} {...reveal(index)} className="cyber-glow-wrap">
                <Card hoverEffect className="h-full px-6 gap-3">
                  <h3 className="text-base text-foreground leading-snug">{cert.name}</h3>
                  <p className="font-label uppercase tracking-[0.15em] text-sm text-accent-tertiary">{cert.issuer}</p>
                  <p className="font-mono text-xs text-muted-foreground">issued: {cert.date}</p>
                  {cert.credentialId && (
                    <p className="font-mono text-xs text-muted-foreground break-all">id: {cert.credentialId}</p>
                  )}
                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-2 inline-flex items-center gap-2 min-h-11 font-label text-xs uppercase tracking-[0.2em] text-accent hover:text-glow focus-visible:outline-2 focus-visible:outline-accent-tertiary"
                    >
                      <ExternalLink className="size-4" strokeWidth={1.5} />
                      View Credential
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
