import fs from 'fs';
import yaml from 'js-yaml';
import type { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'CV - Bishal Karmakar | Software Engineer & Full Stack Developer',
  description: 'View and download the latest CV/resume of Bishal Karmakar, a full-stack developer specializing in modern web technologies.',
  keywords: 'CV, resume, Bishal Karmakar, full stack developer, portfolio, download resume',
  openGraph: {
    title: 'CV - Bishal Karmakar | Full Stack Developer & Software Engineer',
    description: 'View and download the latest CV/resume of Bishal Karmakar, a full-stack developer specializing in modern web technologies.',
    type: 'website',
    url: '/cv',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV - Bishal Karmakar | Full Stack Developer & Software Engineer',
    description: 'View and download the latest CV/resume of Bishal Karmakar, a full-stack developer specializing in modern web technologies.',
  },
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data from YAML file on server side
  const fileContents = fs.readFileSync('public/data/data.yaml', 'utf8');
  const data = yaml.load(fileContents) as Data;

  // Store the data in a way that can be accessed by the page
  return (
    <div data-cv-data={JSON.stringify(data)}>
      {children}
    </div>
  );
}