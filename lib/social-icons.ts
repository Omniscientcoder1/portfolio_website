import type { ComponentType } from "react";
import {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook, FaExternalLinkAlt,
} from "react-icons/fa";

/** Maps the icon names stored on SocialLink rows (set in the admin panel) to components. */
const socialIconMap: Record<string, ComponentType<{ className?: string }>> = {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook,
};

export function getSocialIcon(name: string): ComponentType<{ className?: string }> {
  return socialIconMap[name] ?? FaExternalLinkAlt;
}
