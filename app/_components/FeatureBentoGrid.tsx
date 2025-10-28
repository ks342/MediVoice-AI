"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconStethoscope,
  IconMicrophone,
  IconShieldLock,
  IconCalendarEvent,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";


export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[18rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-base]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-2xl dark:bg-neutral-900 bg-neutral-50 border border-neutral-200 dark:border-neutral-800 p-4">
    <div className="w-full h-full">{children}</div>
  </div>
);

const items = [
  {
    title: "24/7 AI Symptom Triage",
    description: (
      <span className="text-sm">
        Quickly assess patient concerns and guide to the right specialist.
      </span>
    ),
    header: (
      <Panel>
        <motion.div className="h-full w-full rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20" />
      </Panel>
    ),
    className: "md:col-span-1",
    icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Voice Consultations",
    description: (
      <span className="text-sm">
        Natural, real-time voice conversations with our medical AI agents.
      </span>
    ),
    header: (
      <Panel>
        <motion.div className="h-full w-full rounded-lg bg-gradient-to-r from-violet-500/20 to-pink-500/20" />
      </Panel>
    ),
    className: "md:col-span-1",
    icon: <IconMicrophone className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Secure & Private",
    description: (
      <span className="text-sm">
        Data handled with strict privacy practices and secure storage.
      </span>
    ),
    header: (
      <Panel>
        <motion.div className="h-full w-full rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
      </Panel>
    ),
    className: "md:col-span-1",
    icon: <IconShieldLock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Appointment Assistance",
    description: (
      <span className="text-sm">
        Automate scheduling and reminders to reduce no‑shows.
      </span>
    ),
    header: (
      <Panel>
        <motion.div className="h-full w-full rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
      </Panel>
    ),
    className: "md:col-span-2",
    icon: <IconCalendarEvent className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Medical Summaries",
    description: (
      <span className="text-sm">
        Structured reports and visit summaries for faster follow‑ups.
      </span>
    ),
    header: (
      <Panel>
        <motion.div className="h-full w-full rounded-lg bg-gradient-to-r from-sky-500/20 to-indigo-500/20" />
      </Panel>
    ),
    className: "md:col-span-1",
    icon: <IconReportAnalytics className="h-4 w-4 text-neutral-500" />,
  },
];
