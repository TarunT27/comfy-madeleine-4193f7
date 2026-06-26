"use client";

import { useState, useMemo } from "react";
import { Tabs } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Select } from "@/app/components/ui/select";
import { useToast } from "@/app/components/ui/toast";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";

export default function RegistrationPage() {
  const { demoData } = usePortalStore();
  const [tab, setTab] = useState("My Classes");
  const [term, setTerm] = useState("Fall 2027");
  const { push } = useToast();
  const { data } = useFetch<{ schedules: any[] }>("/api/courses", demoData);

  const myClasses = useMemo(() => (data?.schedules ?? []).filter((s) => s.term === term), [data, term]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = ["8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];

  const getCourseAt = (day: string, hour: string) => {
    const hourNum = parseInt(hour);
    const isPM = hour.includes("pm");
    const normalizedHour = (isPM && hourNum !== 12) ? hourNum + 12 : hourNum;

    return myClasses.filter(c => {
      if (c.day !== day) return false;
      
      const timePart = c.time.split(" - ")[0]; // e.g., "10:30 AM"
      const [hourMin, period] = timePart.split(" ");
      const [startHourStr] = hourMin.split(":");
      
      let startHour = parseInt(startHourStr);
      if (period === "PM" && startHour !== 12) startHour += 12;
      if (period === "AM" && startHour === 12) startHour = 0;
      
      return startHour === normalizedHour;
    });
  };

  const getDayColor = (location: string) => {
    if (location.includes("Busch")) return "bg-blue-100 border-blue-200 text-blue-800";
    if (location.includes("Livingston")) return "bg-orange-100 border-orange-200 text-orange-800";
    if (location.includes("Online")) return "bg-red-100 border-red-200 text-red-800";
    return "bg-slate-100 border-slate-200 text-slate-800";
  };

  const [courseCode, setCourseCode] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode) return;
    push(`Course ${courseCode} added to your schedule for ${term}!`);
    setCourseCode("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Registration for {term}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Term:</span>
          <select 
            className="border rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rutgers/20"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="Summer 2027">Summer 2027</option>
            <option value="Fall 2027">Fall 2027</option>
          </select>
        </div>
      </div>
      <Tabs 
        options={["My Classes", "Exceptions"]} 
        value={tab} 
        onChange={setTab} 
      />

      {tab === "My Classes" && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Course List for {term}</h2>
            {myClasses.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Day</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {myClasses.map((s, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 text-rutgers font-medium">{s.course}</td>
                      <td className="py-2">{s.day}</td>
                      <td className="py-2">{s.time}</td>
                      <td className="py-2">{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-slate-600">No classes registered yet for the selected term.</p>
            )}
          </div>

          <div className="card overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b bg-slate-50">
                <div className="p-2 border-r"></div>
                {days.map(d => <div key={d} className="p-2 text-center font-bold border-r last:border-0">{d}</div>)}
              </div>
              {hours.map(h => (
                <div key={h} className="grid grid-cols-[80px_repeat(5,1fr)] border-b last:border-0 min-h-[80px]">
                  <div className="p-2 border-r text-xs text-slate-500 text-right font-medium">{h}</div>
                  {days.map(d => {
                    const courses = getCourseAt(d, h);
                    return (
                      <div key={d} className="p-1 border-r last:border-0 relative bg-slate-50/30">
                        {courses.map((course, idx) => (
                          <div key={idx} className={`text-[10px] leading-tight p-2 rounded border shadow-sm h-full flex flex-col justify-center ${getDayColor(course.location)}`}>
                            <div className="font-bold mb-1">{course.course}</div>
                            <div className="opacity-80 font-medium">{course.time}</div>
                            <div className="opacity-80">{course.location}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></span> Busch</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-100 border border-orange-200 rounded-sm"></span> Livingston</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm"></span> Online (Live)</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 text-slate-300">|</span> * Based on your course selections</span>
            </div>
          </div>
        </div>
      )}

      {tab === "Exceptions" && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Registration Exceptions</h2>
          <p className="text-slate-600">Any prerequisite overrides or credit limit exceptions will appear here.</p>
          <Button variant="outline" className="mt-4">Request Exception</Button>
        </div>
      )}
    </div>
  );
}
