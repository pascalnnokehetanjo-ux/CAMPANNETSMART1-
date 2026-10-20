/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * CAMPANNETSMART1 - Deterministic Calculation & Appreciation Engine
 * Strictly enforces official 2018 APC formulas and decimal precision.
 * AI never determines or alters marks.
 */

export interface EvaluationScore {
  oral: number;
  written: number;
  practical: number;
  attitude: number;
}

export interface SubjectEvaluationConfig {
  id: string;
  code: string;
  nameEn: string;
  nameFr: string;
  competenceId: number;
  evalTypes: {
    oral: { max: number; enabled: boolean };
    written: { max: number; enabled: boolean };
    practical: { max: number; enabled: boolean };
    attitude: { max: number; enabled: boolean };
  };
}

export const DEFAULT_SUBJECTS: SubjectEvaluationConfig[] = [
  { id: '1A', code: '1A', nameEn: 'Communicate in English', nameFr: 'Communication en Anglais', competenceId: 1, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 15, enabled: true }, practical: { max: 5, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '1B', code: '1B', nameEn: 'Communicate in French', nameFr: 'Communication en Français', competenceId: 1, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 15, enabled: true }, practical: { max: 5, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '1C', code: '1C', nameEn: 'Communicate in National Language', nameFr: 'Communication en Langue Nationale', competenceId: 1, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 15, enabled: true }, practical: { max: 5, enabled: true }, attitude: { max: 5, enabled: true } } },
  
  { id: '2A', code: '2A', nameEn: 'Basic Notions in Mathematics', nameFr: 'Notions de base en Mathématiques', competenceId: 2, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 15, enabled: true }, practical: { max: 5, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '2B', code: '2B', nameEn: 'Science and Technology', nameFr: 'Sciences et Technologie', competenceId: 2, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 15, enabled: true }, practical: { max: 5, enabled: true }, attitude: { max: 5, enabled: true } } },
  
  { id: '3A', code: '3A', nameEn: 'Practice Social Values', nameFr: 'Pratique des Valeurs Sociales', competenceId: 3, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 10, enabled: true }, practical: { max: 5, enabled: false }, attitude: { max: 10, enabled: true } } },
  { id: '3B', code: '3B', nameEn: 'Practice Citizenship Values', nameFr: 'Pratique des Valeurs Citoyennes', competenceId: 3, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 10, enabled: true }, practical: { max: 5, enabled: false }, attitude: { max: 10, enabled: true } } },
  
  { id: '4A', code: '4A', nameEn: 'Vocational Studies', nameFr: 'Activités Professionnelles', competenceId: 4, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 10, enabled: true }, practical: { max: 10, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '4B', code: '4B', nameEn: 'Entrepreneurship', nameFr: 'Entreprenariat', competenceId: 4, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 10, enabled: true }, practical: { max: 10, enabled: true }, attitude: { max: 5, enabled: true } } },
  
  { id: '5', code: '5', nameEn: 'Information and Communication Technology (ICT)', nameFr: 'Technologies de l’Information et de la Communication (TIC)', competenceId: 5, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 10, enabled: true }, practical: { max: 10, enabled: true }, attitude: { max: 5, enabled: true } } },
  
  { id: '6A1', code: '6A1', nameEn: 'Physical & Sports (Non-Challenged)', nameFr: 'Éducation Physique et Sportive (Non-handicapés)', competenceId: 6, evalTypes: { oral: { max: 5, enabled: false }, written: { max: 5, enabled: true }, practical: { max: 15, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '6A2', code: '6A2', nameEn: 'Physical & Sports (Challenged)', nameFr: 'Éducation Physique et Sportive (Handicapés)', competenceId: 6, evalTypes: { oral: { max: 5, enabled: false }, written: { max: 5, enabled: true }, practical: { max: 15, enabled: true }, attitude: { max: 5, enabled: true } } },
  { id: '6B', code: '6B', nameEn: 'Artistic Activities', nameFr: 'Activités Artistiques', competenceId: 6, evalTypes: { oral: { max: 5, enabled: true }, written: { max: 5, enabled: true }, practical: { max: 15, enabled: true }, attitude: { max: 5, enabled: true } } }
];

export interface CalculationResult {
  studentId: string;
  studentName: string;
  month: string;
  subjectScores: {
    [subjectId: string]: {
      obtained: number;
      max: number;
      isIncomplete: boolean;
    };
  };
  totalObtained: number;
  totalMax: number;
  monthlyAverage: number;
  appreciation: {
    code: string;
    labelEn: string;
    labelFr: string;
    grade: string;
  };
  isProvisional: boolean;
  calculationVersionId: string;
  timestamp: string;
}

export function getAppreciation(mark: number, scale: 20 | 1 = 20) {
  if (scale === 20) {
    if (mark >= 18) {
      return { code: 'Ept', labelEn: 'Expert', labelFr: 'Expert', grade: 'A+' };
    } else if (mark >= 15) {
      return { code: 'CA', labelEn: 'Competences Acquired', labelFr: 'Compétences Acquises', grade: 'A' };
    } else if (mark >= 11) {
      return { code: 'CPA', labelEn: 'Process of Acquisition', labelFr: 'Compétences En Cours d’Acquisition', grade: 'B' };
    } else {
      return { code: 'CNA', labelEn: 'Not Acquired', labelFr: 'Compétences Non Acquises', grade: 'C' };
    }
  } else {
    if (mark >= 0.9) {
      return { code: 'Ept', labelEn: 'Expert', labelFr: 'Expert', grade: 'A+' };
    } else if (mark >= 0.75) {
      return { code: 'CA', labelEn: 'Competences Acquired', labelFr: 'Compétences Acquises', grade: 'A' };
    } else if (mark >= 0.55) {
      return { code: 'CPA', labelEn: 'Process of Acquisition', labelFr: 'Compétences En Cours d’Acquisition', grade: 'B' };
    } else {
      return { code: 'CNA', labelEn: 'Not Acquired', labelFr: 'Compétences Non Acquises', grade: 'C' };
    }
  }
}

export function getSubjectMaxMark(subject: SubjectEvaluationConfig): number {
  let max = 0;
  if (subject.evalTypes.oral.enabled) max += subject.evalTypes.oral.max;
  if (subject.evalTypes.written.enabled) max += subject.evalTypes.written.max;
  if (subject.evalTypes.practical.enabled) max += subject.evalTypes.practical.max;
  if (subject.evalTypes.attitude.enabled) max += subject.evalTypes.attitude.max;
  return max;
}

export function getTotalMaxAllSubjects(subjects: SubjectEvaluationConfig[]): number {
  return subjects.reduce((acc, sub) => acc + getSubjectMaxMark(sub), 0);
}

export function calculateStudentMonthly(
  studentId: string,
  studentName: string,
  month: string,
  scores: { [subjectId: string]: EvaluationScore },
  subjects: SubjectEvaluationConfig[],
  scale: 20 | 1 = 20
): CalculationResult {
  let totalObtained = 0;
  let totalMax = 0;
  let isIncomplete = false;
  const subjectScores: CalculationResult['subjectScores'] = {};

  subjects.forEach(sub => {
    const subScores = scores[sub.id];
    let subObtained = 0;
    let subMax = getSubjectMaxMark(sub);
    let subIncomplete = false;

    if (!subScores) {
      subIncomplete = true;
      isIncomplete = true;
    } else {
      if (sub.evalTypes.oral.enabled) {
        const val = subScores.oral;
        if (val === undefined || val === null || val < 0 || val > sub.evalTypes.oral.max) {
          subIncomplete = true;
          isIncomplete = true;
        } else {
          subObtained += val;
        }
      }
      if (sub.evalTypes.written.enabled) {
        const val = subScores.written;
        if (val === undefined || val === null || val < 0 || val > sub.evalTypes.written.max) {
          subIncomplete = true;
          isIncomplete = true;
        } else {
          subObtained += val;
        }
      }
      if (sub.evalTypes.practical.enabled && subScores.practical !== undefined) {
        const val = subScores.practical;
        if (val >= 0 && val <= sub.evalTypes.practical.max) {
          subObtained += val;
        }
      }
      if (sub.evalTypes.attitude.enabled && subScores.attitude !== undefined) {
        const val = subScores.attitude;
        if (val >= 0 && val <= sub.evalTypes.attitude.max) {
          subObtained += val;
        }
      }
    }

    subjectScores[sub.id] = {
      obtained: subObtained,
      max: subMax,
      isIncomplete: subIncomplete
    };

    totalObtained += subObtained;
    totalMax += subMax;
  });

  const totalMaxAll = getTotalMaxAllSubjects(subjects);
  const monthlyAverageRaw = totalMaxAll > 0 ? (20 * totalObtained) / totalMaxAll : 0;
  const monthlyAverage = Number(monthlyAverageRaw.toFixed(2));

  const appreciation = getAppreciation(monthlyAverage, scale);

  return {
    studentId,
    studentName,
    month,
    subjectScores,
    totalObtained: Number(totalObtained.toFixed(2)),
    totalMax: totalMaxAll,
    monthlyAverage,
    appreciation,
    isProvisional: isIncomplete,
    calculationVersionId: `v1.0-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
}

export function calculateTermlyAverage(monthlyAverages: number[]): number {
  if (monthlyAverages.length === 0) return 0;
  const sum = monthlyAverages.reduce((acc, m) => acc + m, 0);
  return Number((sum / monthlyAverages.length).toFixed(2));
}

export function calculateAnnualAverage(termAverages: number[]): number {
  if (termAverages.length === 0) return 0;
  const sum = termAverages.reduce((acc, t) => acc + t, 0);
  return Number((sum / termAverages.length).toFixed(2));
}
