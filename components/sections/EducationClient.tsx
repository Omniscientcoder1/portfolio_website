"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import type { Education, Certification } from "@/types";

interface Props {
  education: Education[];
  certifications: Certification[];
}

export function EducationClient({ education, certifications }: Props) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Education & Certifications</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            My academic background and professional certifications
          </p>
        </motion.div>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <FaGraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-strong h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">{edu.degree}</CardTitle>
                    <CardDescription className="text-lg text-primary font-semibold">
                      {edu.institution}
                    </CardDescription>
                    <p className="text-sm text-foreground/60">{edu.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-3">{edu.description}</p>
                    {edu.gpa && (
                      <p className="text-sm font-semibold">
                        GPA: <span className="text-primary">{edu.gpa}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <FaCertificate className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-strong h-full hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{cert.issuer}</CardDescription>
                    <p className="text-sm text-foreground/60">{cert.date}</p>
                  </CardHeader>
                  <CardContent>
                    {cert.credentialId && (
                      <p className="text-xs text-foreground/60 mb-2">ID: {cert.credentialId}</p>
                    )}
                    {cert.credentialLink && (
                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        View Credential
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
