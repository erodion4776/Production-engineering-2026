import { Question } from '../types';

// MODULE 1 GENERATOR
const generateModule1Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 1000;

  for (let i = 0; i < 50; i++) {
    const ot = Math.floor(Math.random() * 15) + 5;
    const rating = [80, 90, 100, 110, 120][Math.floor(Math.random() * 5)];
    const nt = (ot * rating) / 100;
    questions.push({
      id: idCounter++,
      text: `[M1-Calc] If the Observed Time is ${ot}s and worker Rating is ${rating}%, calculate the Normal Time.`,
      options: [`${(nt * 0.9).toFixed(2)}s`, `${nt.toFixed(2)}s`, `${(nt * 1.1).toFixed(2)}s`, `${(ot + 2).toFixed(2)}s`],
      correctAnswer: 1,
      explanation: "Normal Time = Observed Time × (Rating / 100)."
    });
  }

  const theory = [
    { q: "Who is the Father of Scientific Management?", a: "F.W. Taylor", o: ["Frank Gilbreth", "Henry Ford", "Lillian Gilbreth"] },
    { q: "What does 'Takt Time' represent?", a: "Heartbeat of customer demand", o: ["Actual machine speed", "Total break time", "Raw stopwatch time"] },
    { q: "The term 'Therblig' is named after?", a: "Gilbreth (spelled backward)", o: ["Taylor", "Ergonomics", "Production"] }
  ];

  theory.forEach(t => {
    for(let i=0; i<33; i++) {
      const options = [t.a, ...t.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${t.q} (Theory Variation ${i+1})`,
        options,
        correctAnswer: options.indexOf(t.a),
        explanation: "This is a fundamental concept from Module 1 slides."
      });
    }
  });

  return questions;
};

// MODULE 2 GENERATOR
const generateModule2Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 2000;

  for (let i = 0; i < 50; i++) {
    const secondsSaved = Math.floor(Math.random() * 5) + 2;
    const parts = [500, 1000, 2000, 5000][Math.floor(Math.random() * 4)];
    const totalSaved = (secondsSaved * parts) / 60;
    questions.push({
      id: idCounter++,
      text: `[M2-Calc] A jig saves ${secondsSaved} seconds per part. If the operator produces ${parts} parts, how many minutes of labor are saved?`,
      options: [
        `${(totalSaved * 0.5).toFixed(1)} mins`,
        `${totalSaved.toFixed(1)} mins`,
        `${(totalSaved * 1.5).toFixed(1)} mins`,
        `${(secondsSaved * parts).toFixed(0)} mins`
      ],
      correctAnswer: 1,
      explanation: "Total saved = (Seconds saved per part × Total parts) / 60 seconds."
    });
  }

  const theoryBases = [
    { q: "Which of these is an 'Ineffective' (Waste) Therblig?", a: "Search", o: ["Grasp", "Assemble", "Move"] },
    { q: "The 'Maximum Working Area' for an operator is defined by a:", a: "Semicircle", o: ["Square", "Triangle", "Straight line"] },
    { q: "Using gravity to deliver parts to a bin is called:", a: "Drop Delivery", o: ["Manual Transport", "Hold Therblig", "Momentum Shift"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 33; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Ref: Module 2 Slide ${i % 15 + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "Correct as per the Principles of Motion Economy."
      });
    }
  });

  return questions;
};

// MODULE 3 GENERATOR (Mathematical Core)
const generateModule3Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 3000;

  for (let i = 0; i < 30; i++) {
    const ot = Math.floor(Math.random() * 51) + 10;
    const rating = [75, 80, 85, 90, 95, 105, 110, 115, 120, 125][Math.floor(Math.random() * 10)];
    const nt = (ot * rating) / 100;
    questions.push({
      id: idCounter++,
      text: `[M3-Calc] A worker has an Observed Time of ${ot} seconds and a Performance Rating of ${rating}%. What is the Normal Time?`,
      options: [`${(nt * 0.8).toFixed(2)}s`, `${nt.toFixed(2)}s`, `${(nt + 5).toFixed(2)}s`, `${(ot).toFixed(2)}s`],
      correctAnswer: 1,
      explanation: `Normal Time = Observed Time × (Rating / 100).`
    });
  }

  for (let i = 0; i < 30; i++) {
    const nt = Math.floor(Math.random() * 9) + 2;
    const allowance = Math.floor(Math.random() * 16) + 10;
    const st = nt * (1 + allowance / 100);
    questions.push({
      id: idCounter++,
      text: `[M3-Calc] Given a Normal Time of ${nt} minutes and a total Allowance factor of ${allowance}%, calculate the Standard Time (ST).`,
      options: [`${(nt + 1).toFixed(2)} mins`, `${st.toFixed(2)} mins`, `${(nt * (allowance/100)).toFixed(2)} mins`, `${(nt + allowance).toFixed(2)} mins`],
      correctAnswer: 1,
      explanation: `Standard Time = Normal Time × (1 + Allowance Factor).`
    });
  }

  const theoryBases = [
    { q: "Which allowance category covers restroom breaks and drinking water?", a: "Personal Allowance", o: ["Contingency Allowance", "Fatigue Allowance", "Policy Allowance"] },
    { q: "A 'Policy Allowance' is typically determined by:", a: "Management/Union Negotiations", o: ["The Engineer's Stopwatch", "The Machine's RPM", "The Ambient Temperature"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 45; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (M3 Theory ${i + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "Correct per Module 3 guidelines."
      });
    }
  });

  return questions;
};

// MODULE 4 GENERATOR (Production Planning & Control)
const generateModule4Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 4000;

  for (let i = 0; i < 50; i++) {
    const designCap = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
    const actualOut = Math.floor(designCap * (Math.random() * 0.4 + 0.6));
    const util = (actualOut / designCap) * 100;
    questions.push({
      id: idCounter++,
      text: `[M4-Scenario] If a manufacturing cell has a Design Capacity of ${designCap} units/day but produces exactly ${actualOut} units, what is its Utilization?`,
      options: [`${(util - 5).toFixed(1)}%`, `${util.toFixed(1)}%`, `${(util + 10).toFixed(1)}%`, `${(designCap - actualOut).toFixed(1)}%`],
      correctAnswer: 1,
      explanation: `Utilization = (Actual Output / Design Capacity) × 100.`
    });
  }

  const theoryBases = [
    { q: "In the four pillars of PPC, which phase is known as the 'Authorization to Start'?", a: "Dispatching", o: ["Routing", "Scheduling", "Expediting"] },
    { q: "What is the primary document used in the 'Routing' phase?", a: "Route Sheet", o: ["Gantt Chart", "BOM", "MPS"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 50; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Concept ${i + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This is a core PPC concept."
      });
    }
  });

  return questions;
};

// MODULE 5 GENERATOR (Industrial Safety, PPE & Ergonomics)
const generateModule5Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 5000;

  const theoryBases = [
    { q: "Which fire extinguisher must NEVER be used on an Electrical Fire?", a: "Water", o: ["CO2", "Dry Powder", "Halon"] },
    { q: "What is the correct PPE for handling strong industrial acids?", a: "Nitrile/Rubber Gloves", o: ["Cotton Gloves", "No Gloves", "Leather Gloves"] },
    { q: "Why is it dangerous to wear loose gloves near rotating machinery like a Lathe?", a: "Entanglement hazard (pulls hand in)", o: ["They get dirty", "Reduces grip strength", "It is against the Factories Act"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 50; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Safety Check ${i + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This is a critical safety principle."
      });
    }
  });

  return questions;
};

// MODULE 6 GENERATOR (Inventory Control)
const generateModule6Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 6000;

  for (let i = 0; i < 25; i++) {
    const d = [1000, 2000, 5000, 10000][Math.floor(Math.random() * 4)];
    const s = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
    const h = [2, 5, 10][Math.floor(Math.random() * 3)];
    const eoq = Math.sqrt((2 * d * s) / h);
    questions.push({
      id: idCounter++,
      text: `[M6-Calc] Annual Demand (D) = ${d} units, Ordering Cost (S) = N${s}, and Holding Cost (H) = N${h} per unit/year. Calculate the Economic Order Quantity (EOQ).`,
      options: [`${(eoq * 0.7).toFixed(0)} units`, `${eoq.toFixed(0)} units`, `${(eoq * 1.5).toFixed(0)} units`, `${(d/12).toFixed(0)} units`],
      correctAnswer: 1,
      explanation: `EOQ = √((2 * D * S) / H).`
    });
  }

  for (let i = 0; i < 25; i++) {
    const dailyDemand = Math.floor(Math.random() * 20) + 5;
    const leadTime = Math.floor(Math.random() * 7) + 3;
    const safetyStock = Math.floor(Math.random() * 50) + 10;
    const rop = (dailyDemand * leadTime) + safetyStock;
    questions.push({
      id: idCounter++,
      text: `[M6-Calc] Daily demand is ${dailyDemand} units. Lead time is ${leadTime} days. Safety Stock is ${safetyStock}. What is the ROP?`,
      options: [`${rop - 15} units`, `${rop} units`, `${rop + 25} units`, `${dailyDemand * leadTime} units`],
      correctAnswer: 1,
      explanation: `ROP = (Daily Demand * Lead Time) + Safety Stock.`
    });
  }

  const theoryBases = [
    { q: "In the Japanese JIT system, what does the term 'Kanban' literally mean?", a: "Visual Signal or Card", o: ["Fast Production", "Zero Inventory", "Continuous Improvement"] },
    { q: "The primary objective of Just-In-Time (JIT) manufacturing is to eliminate:", a: "Inventory and Waste", o: ["Skilled Labor", "Machine Maintenance", "Customer Demand"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 50; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (M6 Concept ${i + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "Correct as per the Inventory Control and SCM principles."
      });
    }
  });

  return questions;
};

// MODULE 7 GENERATOR (Quality Control)
const generateModule7Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 7000;

  const methodologies = [
    { q: "What does the DMAIC methodology in Six Sigma stand for?", a: "Define-Measure-Analyze-Improve-Control", o: ["Design-Make-Act-Install-Change", "Develop-Manage-Analyze-Inspect-Correct", "Define-Map-Assess-Improve-Confirm"] },
    { q: "Six Sigma aims for a statistical perfection level of how many Defects Per Million Opportunities (DPMO)?", a: "3.4", o: ["Zero", "100", "500"] },
    { q: "The PDCA cycle, used for continuous improvement, stands for:", a: "Plan-Do-Check-Act", o: ["Please-Do-Call-Again", "Prepare-Develop-Confirm-Audit", "Process-Define-Control-Analyze"] },
    { q: "The Japanese term 'Kaizen' refers to which quality philosophy?", a: "Continuous Improvement", o: ["Mistake Proofing", "Visual Signal", "Waste Elimination"] },
    { q: "In Six Sigma, which 'Belt' level identifies a full-time project leader and expert statistician?", a: "Black Belt", o: ["Yellow Belt", "Green Belt", "White Belt"] }
  ];

  methodologies.forEach(base => {
    for (let i = 0; i < 10; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Ref: M7-Methodology-${i+1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This is a fundamental acronym or goal in Quality Control."
      });
    }
  });

  return questions;
};

// MODULE 8 GENERATOR (Plant Layout & Material Handling)
const generateModule8Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 8000;

  const theoryBases = [
    { q: "Which layout type is most appropriate for high-volume, low-variety mass production like bottling plants?", a: "Product Layout (Line Layout)", o: ["Process Layout", "Fixed Position Layout", "Cellular Layout"] },
    { q: "In which layout are machines grouped by function (e.g., all lathes in one department)?", a: "Process Layout (Functional Layout)", o: ["Product Layout", "Fixed Position Layout", "Retail Layout"] },
    { q: "Building a massive ship or an aircraft carrier requires which specific layout?", a: "Fixed Position Layout", o: ["Product Layout", "Line Layout", "Cellular Layout"] },
    { q: "Which hybrid layout groups dissimilar machines into cells to produce a specific family of parts?", a: "Cellular Layout", o: ["Fixed Position", "Process Layout", "Straight Line Layout"] },
    { q: "Which equipment is designed for moving uniform loads continuously over a fixed path?", a: "Conveyors", o: ["Forklifts", "AGVs", "Jib Cranes"] },
    { q: "In Richard Muther's REL Chart (SLP), what does the code 'A' signify between two departments?", a: "Absolutely Necessary to be close", o: ["Avoid being close", "Average importance", "Always noisy"] },
    { q: "Which flow pattern is most popular in JIT/Lean manufacturing for entrance/exit visibility?", a: "U-Shaped Pattern", o: ["Straight Line", "Zig-Zag", "S-Shaped"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 20; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (M8 Analysis ${i + 1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This principle is key to efficient Space Management and Material Handling."
      });
    }
  });

  return questions;
};

// MODULE 9 GENERATOR (Costing, Overheads & Break-Even Analysis)
const generateModule9Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 9000;

  // Type 1: The Calculations (25 Questions)
  for (let i = 0; i < 10; i++) {
    const fc = [5000, 10000, 15000, 20000, 25000][Math.floor(Math.random() * 5)];
    const sp = [100, 150, 200, 250][Math.floor(Math.random() * 4)];
    const vc = [40, 50, 60, 70][Math.floor(Math.random() * 4)];
    const bep = Math.ceil(fc / (sp - vc));
    questions.push({
      id: idCounter++,
      text: `[M9-Calc] A factory has a Fixed Cost of N${fc.toLocaleString()}, a Selling Price per unit of N${sp}, and a Variable Cost per unit of N${vc}. Calculate the Break-Even Point (BEP) in units.`,
      options: [`${bep - 5} units`, `${bep} units`, `${bep + 10} units`, `${Math.floor(fc/sp)} units`],
      correctAnswer: 1,
      explanation: `BEP = Fixed Cost / (Selling Price - Variable Cost).`
    });
  }

  for (let i = 0; i < 8; i++) {
    const fc = [2000, 5000, 8000][Math.floor(Math.random() * 3)];
    const vc = [200, 300, 500][Math.floor(Math.random() * 3)];
    const q = [10, 20, 50][Math.floor(Math.random() * 3)];
    const tc = fc + (vc * q);
    questions.push({
      id: idCounter++,
      text: `[M9-Calc] If the Fixed Cost is N${fc.toLocaleString()}, Variable Cost per unit is N${vc}, and Quantity produced is ${q}, what is the Total Cost?`,
      options: [`N${tc - 500}`, `N${tc.toLocaleString()}`, `N${tc + 1000}`, `N${vc * q}`],
      correctAnswer: 1,
      explanation: `Total Cost = Fixed Cost + (Variable Cost per Unit × Quantity).`
    });
  }

  for (let i = 0; i < 7; i++) {
    const cost = [50000, 100000, 200000][Math.floor(Math.random() * 3)];
    const scrap = [5000, 10000, 20000][Math.floor(Math.random() * 3)];
    const life = [5, 10, 20][Math.floor(Math.random() * 3)];
    const dep = (cost - scrap) / life;
    questions.push({
      id: idCounter++,
      text: `[M9-Calc] A machine costs N${cost.toLocaleString()} with a scrap value of N${scrap.toLocaleString()} and a useful life of ${life} years. Calculate the Annual Depreciation.`,
      options: [`N${dep + 500}`, `N${dep.toLocaleString()}`, `N${cost / life}`, `N${(cost - scrap) * life}`],
      correctAnswer: 1,
      explanation: `Annual Depreciation = (Cost - Scrap Value) / Useful Life.`
    });
  }

  const theoryBases = [
    { q: "Rent, Insurance, and Security salaries are examples of which type of cost?", a: "Fixed Costs (FC)", o: ["Variable Costs (VC)", "Direct Materials", "Opportunity Costs"] },
    { q: "Which cost increases directly with every additional unit produced (e.g., raw materials)?", a: "Variable Costs (VC)", o: ["Fixed Costs", "Sunk Costs", "Depreciation"] },
    { q: "The point where Total Revenue exactly equals Total Cost is known as the:", a: "Break-Even Point (BEP)", o: ["Profit Margin", "Contribution Margin", "Sunk Point"] }
  ];

  theoryBases.forEach(base => {
    for (let i = 0; i < 5; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Ref: M9-Theory-${i+1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This is a fundamental principle of Engineering Economics."
      });
    }
  });

  return questions;
};

// MODULE 10 GENERATOR (Maintenance Engineering)
const generateModule10Questions = (): Question[] => {
  const questions: Question[] = [];
  let idCounter = 10000;

  // Type 1: The Calculations (20 Questions)
  // Template A: MTBF
  for (let i = 0; i < 7; i++) {
    const runTime = [1000, 2000, 5000][Math.floor(Math.random() * 3)];
    const failures = [2, 5, 10][Math.floor(Math.random() * 3)];
    const mtbf = runTime / failures;
    questions.push({
      id: idCounter++,
      text: `[M10-Calc] A machine has a total run time of ${runTime} hours and experienced ${failures} failures. Calculate the Mean Time Between Failures (MTBF).`,
      options: [`${mtbf - 50} hours`, `${mtbf} hours`, `${mtbf + 100} hours`, `${runTime * failures} hours`],
      correctAnswer: 1,
      explanation: `MTBF = Total Run Time / Number of Failures. ${runTime} / ${failures} = ${mtbf} hours.`
    });
  }

  // Template B: Availability
  for (let i = 0; i < 7; i++) {
    const mtbf = [100, 200, 500][Math.floor(Math.random() * 3)];
    const mttr = [5, 10, 20][Math.floor(Math.random() * 3)];
    const avail = (mtbf / (mtbf + mttr)) * 100;
    questions.push({
      id: idCounter++,
      text: `[M10-Calc] Given MTBF = ${mtbf} hours and MTTR = ${mttr} hours, calculate the Machine Availability percentage.`,
      options: [`${(avail - 5).toFixed(1)}%`, `${avail.toFixed(1)}%`, `${(avail + 2).toFixed(1)}%`, `${(mttr/mtbf * 100).toFixed(1)}%`],
      correctAnswer: 1,
      explanation: `Availability = MTBF / (MTBF + MTTR). (${mtbf} / (${mtbf} + ${mttr})) * 100 = ${avail.toFixed(1)}%.`
    });
  }

  // Template C: OEE
  for (let i = 0; i < 6; i++) {
    const a = 0.9;
    const p = 0.9;
    const q = 0.9;
    const oee = a * p * q * 100;
    questions.push({
      id: idCounter++,
      text: `[M10-Calc] A production line has Availability = ${a*100}%, Performance = ${p*100}%, and Quality = ${q*100}%. Calculate the Overall Equipment Effectiveness (OEE).`,
      options: [`${(oee - 10).toFixed(1)}%`, `${oee.toFixed(1)}%`, `${(oee + 5).toFixed(1)}%`, `${(a+p+q)/3 * 100}%`],
      correctAnswer: 1,
      explanation: `OEE = Availability × Performance × Quality. ${a} × ${p} × ${q} = ${(a*p*q).toFixed(3)} or ${oee.toFixed(1)}%.`
    });
  }

  // Type 2: Strategies & Philosophies (15 Questions)
  const strategies = [
    { q: "Which strategy involves fixing machines only after they experience a smoke/stop failure?", a: "Breakdown Maintenance (Corrective)", o: ["Preventive Maintenance", "Predictive Maintenance", "TPM"] },
    { q: "Changing car oil every 5,000km is a classic example of which maintenance type?", a: "Preventive Maintenance (PM)", o: ["Breakdown Maintenance", "Condition Monitoring", "RCM"] },
    { q: "What does the Japanese acronym TPM stand for in industrial engineering?", a: "Total Productive Maintenance", o: ["Total Part Management", "Technical Plant Monitoring", "Total Performance Metrics"] },
    { q: "In TPM, who is primarily responsible for 'Autonomous Maintenance' (daily cleaning/bolting)?", a: "The Machine Operator", o: ["The Expert Mechanic", "The Plant Manager", "The Security Guard"] }
  ];

  strategies.forEach(base => {
    for (let i = 0; i < 4; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Ref: M10-Strategy-${i+1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This is a core pillar of Maintenance Engineering."
      });
    }
  });

  // Type 3: Definitions (15 Questions)
  const definitions = [
    { q: "The failure rate of a machine over its entire life cycle is represented by which curve?", a: "The Bathtub Curve", o: ["The Pareto Curve", "The S-Curve", "The Bell Curve"] },
    { q: "High failure rates during the initial installation or startup phase of a machine are called:", a: "Infant Mortality", o: ["Wear-out failures", "Steady-state operation", "Design redundancy"] },
    { q: "Which maintenance tool is used in Predictive Maintenance to detect hot electrical joints?", a: "Thermography", o: ["Hammer", "Stopwatch", "Vibration Analysis"] },
    { q: "What does the metric MTTR represent in reliability engineering?", a: "Mean Time To Repair", o: ["Mean Time To Run", "Max Time To Rotate", "Minimum Tension Required"] }
  ];

  definitions.forEach(base => {
    for (let i = 0; i < 4; i++) {
      const options = [base.a, ...base.o].sort(() => Math.random() - 0.5);
      questions.push({
        id: idCounter++,
        text: `${base.q} (Ref: M10-Definition-${i+1})`,
        options,
        correctAnswer: options.indexOf(base.a),
        explanation: "This definition is critical for tracking factory downtime."
      });
    }
  });

  return questions;
};

const MODULE_BANKS: Record<number, Question[]> = {
  1: generateModule1Questions(),
  2: generateModule2Questions(),
  3: generateModule3Questions(),
  4: generateModule4Questions(),
  5: generateModule5Questions(),
  6: generateModule6Questions(),
  7: generateModule7Questions(),
  8: generateModule8Questions(),
  9: generateModule9Questions(),
  10: generateModule10Questions()
};

export const getAssessmentQuestions = (count: number, moduleId: number): Question[] => {
  const bank = MODULE_BANKS[moduleId] || MODULE_BANKS[1];
  return [...bank].sort(() => 0.5 - Math.random()).slice(0, count);
};
