/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Calendar, BookOpen, Award, Sliders, Shield, History, 
  Globe, Moon, Sun, CheckCircle, AlertCircle, Plus, Edit2, Trash2, Save, 
  ArrowRight, Check, X, FileText, Lock, Unlock, RefreshCw, UserCheck, Calculator,
  Upload, Eye, ZoomIn, Printer, Download, FileSpreadsheet
} from 'lucide-react';
import { 
  DEFAULT_SUBJECTS, 
  calculateStudentMonthly, 
  calculateTermlyAverage, 
  calculateAnnualAverage,
  CalculationResult 
} from './engine/calculationEngine';

type Lang = 'en' | 'fr';
type ReportType = 'monthly' | 'termly' | 'annual';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('reports');

  // Report Generator State
  const [reportType, setReportType] = useState<ReportType>('monthly');
  const [reportLang, setReportLang] = useState<Lang>('en');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('st-01');
  const [selectedMonth, setSelectedMonth] = useState<string>('October');
  const [selectedTerm, setSelectedTerm] = useState<string>('Term 1 / Trimestre 1');

  const students = [
    { id: 'st-01', name: 'Amina Bello', admissionNo: 'CAMP-2026-001', class: 'CM2 / Class 6' },
    { id: 'st-02', name: 'Jean-Pierre Kamga', admissionNo: 'CAMP-2026-002', class: 'CM2 / Class 6' },
    { id: 'st-03', name: 'Fatimatou Garba', admissionNo: 'CAMP-2026-003', class: 'CM2 / Class 6' }
  ];

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Mock calculation results for assembly
  const monthlyCalc: CalculationResult = calculateStudentMonthly(
    currentStudent.id,
    currentStudent.name,
    selectedMonth,
    {
      '1A': { oral: 4, written: 14, practical: 4, attitude: 4 },
      '1B': { oral: 4, written: 13, practical: 4, attitude: 4 },
      '1C': { oral: 4, written: 15, practical: 4, attitude: 5 },
      '2A': { oral: 5, written: 16, practical: 4, attitude: 4 },
      '2B': { oral: 4, written: 13, practical: 4, attitude: 4 },
      '3A': { oral: 4, written: 9, practical: 3, attitude: 9 },
      '3B': { oral: 4, written: 9, practical: 3, attitude: 9 },
      '4A': { oral: 4, written: 10, practical: 9, attitude: 4 },
      '4B': { oral: 4, written: 10, practical: 8, attitude: 4 },
      '5': { oral: 5, written: 10, practical: 9, attitude: 5 },
      '6A1': { oral: 0, written: 5, practical: 14, attitude: 5 },
      '6A2': { oral: 0, written: 0, practical: 0, attitude: 0 },
      '6B': { oral: 4, written: 5, practical: 14, attitude: 4 }
    },
    DEFAULT_SUBJECTS,
    20
  );

  const termlyAvg = calculateTermlyAverage([17.42, 16.85, 17.10]);
  const annualAvg = calculateAnnualAverage([17.12, 16.90, 17.35]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const dict = {
    en: {
      appName: 'CAMPANNETSMART1',
      subtitle: 'Report Card Generation Engine (2018 APC)',
      reportsTab: 'Report Cards',
      printPdf: 'Print / Download PDF',
      selectStudent: 'Select Student',
      reportType: 'Report Type',
      monthly: 'Monthly Report Card',
      termly: 'Termly Report Card',
      annual: 'Annual Report Card',
      templateLang: 'Template Language'
    },
    fr: {
      appName: 'CAMPANNETSMART1',
      subtitle: 'Moteur de Génération de Bulletins (APC 2018)',
      reportsTab: 'Bulletins',
      printPdf: 'Imprimer / Télécharger PDF',
      selectStudent: 'Sélectionner l’Élève',
      reportType: 'Type de Bulletin',
      monthly: 'Bulletin Mensuel',
      termly: 'Bulletin Trimestriel',
      annual: 'Bulletin Annuel',
      templateLang: 'Langue du Modèle'
    }
  }[lang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-45 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              C1
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                {dict.appName}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 font-medium">
                {dict.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${lang === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('fr')} 
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${lang === 'fr' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
              >
                FR
              </button>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-8">
        
        {/* REPORT GENERATOR CONTROLS */}
        <div className="card-glass p-6 no-print flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">{dict.selectStudent}</label>
              <select 
                value={selectedStudentId} 
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.admissionNo})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">{dict.reportType}</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setReportType('monthly')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${reportType === 'monthly' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setReportType('termly')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${reportType === 'termly' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Termly
                </button>
                <button 
                  onClick={() => setReportType('annual')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${reportType === 'annual' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">{dict.templateLang}</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setReportLang('en')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${reportLang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setReportLang('fr')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${reportLang === 'fr' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Français
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.print()}
            className="btn-primary"
          >
            <Printer className="w-4 h-4" />
            <span>{dict.printPdf}</span>
          </button>
        </div>

        {/* PRINTABLE REPORT CARD SHEET */}
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-200 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
          
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
            <div className="text-xs font-bold tracking-widest text-slate-600 uppercase">
              {reportLang === 'fr' ? 'REPUBLIQUE DU CAMEROUN - PAIX - TRAVAIL - PATRIE' : 'REPUBLIC OF CAMEROON - PEACE - WORK - FATHERLAND'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {reportLang === 'fr' ? 'MINISTERE DE L’EDUCATION DE BASE / ENSEIGNEMENTS SECONDAIRES' : 'MINISTRY OF BASIC / SECONDARY EDUCATION'}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-3">
              CAMPANNETSMART1 BILINGUAL ACADEMY
            </h1>
            <div className="text-sm font-bold text-emerald-700 mt-1">
              {reportType === 'monthly' && (reportLang === 'fr' ? `BULLETIN DE NOTES MENSUEL - ${selectedMonth.toUpperCase()} 2026` : `MONTHLY REPORT CARD - ${selectedMonth.toUpperCase()} 2026`)}
              {reportType === 'termly' && (reportLang === 'fr' ? 'BULLETIN TRIMESTRIEL - TRIMESTRE 1' : 'TERMLY REPORT CARD - TERM 1')}
              {reportType === 'annual' && (reportLang === 'fr' ? 'BILAN DES PERFORMANCES ANNUEL (2025/2026)' : 'ANNUAL REPORT CARD (2025/2026 SCHOOL YEAR)')}
            </div>
          </div>

          {/* Student Bio */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">{reportLang === 'fr' ? 'Nom de l’Élève' : 'Student Name'}:</span>
              <strong className="text-slate-900">{currentStudent.name}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">{reportLang === 'fr' ? 'Matricule' : 'Admission No'}:</span>
              <strong className="text-slate-900">{currentStudent.admissionNo}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">{reportLang === 'fr' ? 'Classe' : 'Class'}:</span>
              <strong className="text-slate-900">{currentStudent.class}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">{reportLang === 'fr' ? 'Moyenne Générale' : 'General Average'}:</span>
              <strong className="text-emerald-700 text-base">
                {reportType === 'monthly' && `${monthlyCalc.monthlyAverage} / 20`}
                {reportType === 'termly' && `${termlyAvg} / 20`}
                {reportType === 'annual' && `${annualAvg} / 20`}
              </strong>
            </div>
          </div>

          {/* TABLE CONTENT DEPENDING ON REPORT TYPE */}
          {reportType === 'monthly' && (
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                    <th className="p-3 border-r border-slate-300">{reportLang === 'fr' ? 'Matières & Sous-matières APC' : 'APC Subjects & Sub-Subjects'}</th>
                    <th className="p-3 border-r border-slate-300 text-center">Max Mark</th>
                    <th className="p-3 border-r border-slate-300 text-center">Obtained</th>
                    <th className="p-3 border-r border-slate-300 text-center">Average (/20)</th>
                    <th className="p-3 border-r border-slate-300 text-center">Appreciation</th>
                    <th className="p-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {DEFAULT_SUBJECTS.map(sub => {
                    const subRes = monthlyCalc.subjectScores[sub.id];
                    const obtained = subRes ? subRes.obtained : 0;
                    const maxM = subRes ? subRes.max : 20;
                    const mark20 = Number(((obtained / maxM) * 20).toFixed(2));
                    const app = monthlyCalc.appreciation;
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="p-3 border-r border-slate-300 font-medium">
                          {sub.code}: {reportLang === 'fr' ? sub.nameFr : sub.nameEn}
                        </td>
                        <td className="p-3 border-r border-slate-300 text-center font-bold">{maxM}</td>
                        <td className="p-3 border-r border-slate-300 text-center font-bold text-slate-900">{obtained}</td>
                        <td className="p-3 border-r border-slate-300 text-center">{mark20}</td>
                        <td className="p-3 border-r border-slate-300 text-center font-semibold text-emerald-700">
                          {reportLang === 'fr' ? app.labelFr : app.labelEn}
                        </td>
                        <td className="p-3 text-center font-bold">{app.grade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {reportType === 'termly' && (
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                    <th className="p-3 border-r border-slate-300">Subjects</th>
                    <th className="p-3 border-r border-slate-300 text-center">October</th>
                    <th className="p-3 border-r border-slate-300 text-center">November</th>
                    <th className="p-3 border-r border-slate-300 text-center">December</th>
                    <th className="p-3 border-r border-slate-300 text-center">Term Total</th>
                    <th className="p-3 text-center">Term Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {DEFAULT_SUBJECTS.map(sub => (
                    <tr key={sub.id}>
                      <td className="p-3 border-r border-slate-300 font-medium">{sub.code}: {reportLang === 'fr' ? sub.nameFr : sub.nameEn}</td>
                      <td className="p-3 border-r border-slate-300 text-center">14</td>
                      <td className="p-3 border-r border-slate-300 text-center">15</td>
                      <td className="p-3 border-r border-slate-300 text-center">16</td>
                      <td className="p-3 border-r border-slate-300 text-center font-bold">45 / 60</td>
                      <td className="p-3 text-center font-bold text-emerald-700">15.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {reportType === 'annual' && (
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                    <th className="p-3 border-r border-slate-300">Term Period</th>
                    <th className="p-3 border-r border-slate-300 text-center">Term Average (/20)</th>
                    <th className="p-3 border-r border-slate-300 text-center">Appreciation</th>
                    <th className="p-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr>
                    <td className="p-3 border-r border-slate-300 font-medium">Term 1 / Trimestre 1</td>
                    <td className="p-3 border-r border-slate-300 text-center font-bold">17.12</td>
                    <td className="p-3 border-r border-slate-300 text-center text-emerald-700 font-semibold">Competences Acquired</td>
                    <td className="p-3 text-center font-bold">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-r border-slate-300 font-medium">Term 2 / Trimestre 2</td>
                    <td className="p-3 border-r border-slate-300 text-center font-bold">16.90</td>
                    <td className="p-3 border-r border-slate-300 text-center text-emerald-700 font-semibold">Competences Acquired</td>
                    <td className="p-3 text-center font-bold">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-r border-slate-300 font-medium">Term 3 / Trimestre 3</td>
                    <td className="p-3 border-r border-slate-300 text-center font-bold">17.35</td>
                    <td className="p-3 border-r border-slate-300 text-center text-emerald-700 font-semibold">Competences Acquired</td>
                    <td className="p-3 text-center font-bold">A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Monthly Average / Moyenne</div>
              <div className="text-2xl font-black text-slate-900">{monthlyCalc.monthlyAverage} / 20</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Termly Average / Trimestre</div>
              <div className="text-2xl font-black text-slate-900">{termlyAvg} / 20</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Annual Average / Annuel</div>
              <div className="text-2xl font-black text-emerald-700">{annualAvg} / 20</div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-6 pt-16 text-center text-xs font-semibold text-slate-700">
            <div>
              <div className="mb-12">Parent’s Signature</div>
              <div className="border-t border-slate-400 pt-1">Visa du Parent</div>
            </div>
            <div>
              <div className="mb-12">Teacher’s Signature</div>
              <div className="border-t border-slate-400 pt-1">Visa de l’Enseignant</div>
            </div>
            <div>
              <div className="mb-12">Principal’s Stamp & Signature</div>
              <div className="border-t border-slate-400 pt-1">Cachet & Signature du Directeur</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
