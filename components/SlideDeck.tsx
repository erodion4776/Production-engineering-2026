import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, CheckCircle } from 'lucide-react';

interface Props {
  moduleId: number;
  moduleTitle: string;
  onComplete: () => void;
}

const moduleContent: Record<number, { title: string; content: string }[]> = {
  1: [
    { title: "Slide 1: Introduction to Time Study", content: "Time Study is the analysis of a specific job in an effort to find the most efficient method in terms of time and effort. In Production Engineering, we do not guess; we measure. A stopwatch is to an engineer what a stethoscope is to a doctor. It diagnoses the health of a factory." },
    { title: "Slide 2: The 'Time is Money' Equation", content: "In a factory like Nigerian Bottling Company (NBC), a filling line moves at 600 bottles per minute. If a worker wastes just 2 seconds adjusting a cap, that delay ripples down the line. In one hour, that 2-second delay repeated can cost the company over 500 cases of lost production." },
    { title: "Slide 3: Frederick Winslow Taylor", content: "We use the theories of F.W. Taylor (The Father of Scientific Management). He believed that for every job, there is 'One Best Way' to do it. He proved that by removing unnecessary movements, you can triple productivity without making the worker work harder—just smarter." },
    { title: "Slide 4: The Gilbreths & Motion Study", content: "Frank and Lillian Gilbreth categorized all human hand motions into 17 units called 'Therbligs' (Gilbreth spelled backwards). Examples include 'Grasp,' 'Hold,' and 'Position.' Your goal is to eliminate the useless Therbligs (like 'Search' or 'Wait') to save time." },
    { title: "Slide 5: Observed Time (OT)", content: "This is what you see on the stopwatch. If you timed yourself assembling the bolt and it took 10 seconds, that is the Observed Time. However, this is NOT the final time we use for paying wages." },
    { title: "Slide 6: Rating Factor (RF)", content: "Not all workers work at the same speed. Some are fast (120%), some are slow (80%). The engineer must 'Rate' the worker against a standard pace. Formula: Normal Time = Observed Time × (Rating / 100)." },
    { title: "Slide 7: Allowances (The Human Factor)", content: "Machines don't get tired, but humans do. We must add time for: Fatigue Allowance (rest from strain), Personal Allowance (restroom/water), and Contingency Allowance (unavoidable delays)." },
    { title: "Slide 8: Standard Time (ST)", content: "This is the most important formula in this course. It is the time used to set prices and wages. Formula: Standard Time = Normal Time + Allowances. Without Standard Time, you cannot schedule production." },
    { title: "Slide 9: Cycle Time vs. Takt Time", content: "Cycle Time: How long it takes to make one unit. Takt Time: The heartbeat of the customer. It is the available time divided by customer demand. If you produce slower than Takt Time, you lose customers." },
    { title: "Slide 10: Real World: The Fast Food Example", content: "Think of 'Mr. Bigg's' or 'KFC'. If it takes 5 minutes to wrap a burger, the queue will grow, and customers will leave. Method study reduces that wrapping time to 45 seconds. This specific optimization is why fast food is profitable." },
    { title: "Slide 11: Real World: The Banking Hall", content: "When you are in a bank in Benin City, and the queue is not moving, it is a failure of Queueing Theory and Time Study. A Production Engineer would analyze the 'Service Rate' of the teller and the 'Arrival Rate' of customers to optimize the system." },
    { title: "Slide 12: Application in Daily Life (Kitchen)", content: "You can apply this at home. If you chop vegetables while the water is boiling, you are doing 'Parallel Processing.' If you wait for the water to boil before you start chopping, you are being inefficient. This is 'Critical Path Analysis.'" },
    { title: "Slide 13: The Cost of Inefficiency (Overheads)", content: "Every minute a machine runs, it consumes electricity (NEPA/Generator cost). If a worker is slow, the generator runs longer for the same amount of product. This increases the 'Overhead Cost per Unit,' making the product uncompetitive." },
    { title: "Slide 14: Safety & Ergonomics", content: "Speed is nothing without safety. A fast method that causes back pain is a bad method. We aim for 'Ergonomic Efficiency'—working fast in a posture that is healthy for the human body." },
    { title: "Slide 15: Conclusion of Module 1", content: "You have learned that Time Study is the bridge between Engineering and Business. In the next module, we will go deeper into 'Rating Techniques.' Now, prepare for your assessment. You cannot go back once you start." }
  ],
  2: [
    { title: "Slide 1: What is Motion Economy?", content: "Motion Economy is the science of eliminating wastefulness resulting from using the body improperly. It is not about working faster; it is about working easier. If you reduce the distance your hand travels, you reduce fatigue and cycle time." },
    { title: "Slide 2: The Gilbreths", content: "Frank and Lillian Gilbreth are the parents of Motion Study. They analyzed bricklayers and reduced the motions per brick from 18 to 4.5. This increased bricks laid per hour from 120 to 350 without additional worker fatigue." },
    { title: "Slide 3: The 17 Therbligs", content: "The Gilbreths discovered that all manual work consists of 17 fundamental hand motions called 'Therbligs' (Gilbreth spelled backward). Every job, from banking to factory work, is just a combination of these 17 motions." },
    { title: "Slide 4: Effective vs. Ineffective Therbligs", content: "Effective (Value Added): Reaching, Grasping, Moving, Assembling. Ineffective (Waste): Searching, Selecting, Holding, Waiting. Your goal is to eliminate the Ineffective group." },
    { title: "Slide 5: The Enemy: 'Hold'", content: "The Therblig 'Hold' is the biggest enemy of efficiency. The human hand is a poor holding device. Rule: Always use a Jig or Fixture to hold parts so both hands are free to work." },
    { title: "Slide 6: The Enemy: 'Search & Select'", content: "If a worker digs through mixed bins, they are performing 'Search' and 'Select.' This wastes time. Solution: Pre-sort parts into separate bins. Eliminate the need for the eye to search." },
    { title: "Slide 7: Principle of the Semicircle", content: "All tools must be located within the 'Maximum Working Area'—the semicircle created by extending your arm. If a worker has to lean forward or stand up, the workstation design has failed." },
    { title: "Slide 8: Gravity Feed Bins", content: "Why reach into flat boxes? Use Gravity Feed Bins where parts slide to the front. This utilizes gravity (which is free) to deliver parts to fingertips, reducing 'Reach' time." },
    { title: "Slide 9: Drop Delivery", content: "When a part is finished, don't carry it to a bin. Just let it go. A chute or hole in the table allows the part to 'Drop Deliver' into a box under the table, saving 'Move' and 'Release' time." },
    { title: "Slide 10: Momentum & Rhythm", content: "Work should be rhythmic. Sharp, jerky movements cause fatigue. Tools should be heavy enough to use momentum (like a hammer) but light enough to not tire the arm." },
    { title: "Slide 11: Two-Handed Process Chart", content: "This tool maps exactly what the Left Hand (LH) and Right Hand (RH) are doing. Bad: LH (Hold) | RH (Screw). Good: LH (Place Washer) | RH (Place Nut)." },
    { title: "Slide 12: Pre-Positioning Tools", content: "Tools should be pre-positioned. A screwdriver hanging on a spring balancer above the work is better than one laying on the table. No 'Search' or 'Orient' needed; just 'Grasp' and 'Use'." },
    { title: "Slide 13: The Cost of Distance", content: "In micro-assembly, saving 6 inches on 5,000 reps saves 2,500 feet of arm travel (8 football fields!). This energy saving translates directly to higher productivity." },
    { title: "Slide 14: Symmetrical Movements", content: "Arm movements should be simultaneous and symmetrical. Moving both arms away or towards the body keeps the worker balanced. Asymmetrical movement causes spinal twisting." },
    { title: "Slide 15: Conclusion", content: "Motion Economy is about 'Work Smart, Not Hard.' By arranging the workplace correctly and eliminating ineffective Therbligs, we maximize profit and minimize worker injury." }
  ],
  3: [
    { title: "Slide 1: Observed Time vs. Standard Time", content: "In the lab, you clicked the stopwatch and got 10 seconds. That is Observed Time (OT). If we used OT to set wages, workers would collapse. Standard Time (ST) is the time required for a qualified worker to complete the job at a sustainable pace." },
    { title: "Slide 2: The Rating Factor", content: "Humans aren't robots. Some work fast (120%), some slow (80%). Before calculating Standard Time, we must 'Normalize' the time. We use the 100 Scale (BSI). If a worker is faster than standard, we adjust their observed time upward." },
    { title: "Slide 3: Calculating Normal Time (Basic Time)", content: "This is the first step. Formula: Normal Time = Observed Time × (Observed Rating / Standard Rating). Example: OT = 20s. Rating = 120 (Fast). Calculation: 20 × (120/100) = 24 seconds." },
    { title: "Slide 4: Introduction to Allowances", content: "Once we have Normal Time, we must add Allowances. These are 'buffers' added to allow the worker to recover from fatigue and attend to personal needs. Without allowances, production schedules are illegal and unethical." },
    { title: "Slide 5: Relaxation Allowance (RA)", content: "The biggest category. Personal Needs: Restroom, drinking water, washing hands (usually 5-7% of shift). Fatigue Allowance: Recovery from physical and mental strain during the work cycle." },
    { title: "Slide 6: Basic vs. Variable Fatigue", content: "Basic Fatigue: Fixed % given to everyone for energy used sitting/standing (usually 4%). Variable Fatigue: Extra % for harsh conditions: High Heat (Foundries), Heavy Lifting, or Poor Light." },
    { title: "Slide 7: Contingency Allowance", content: "For small, unavoidable delays too short to measure individually (e.g., dropping a tool, waiting for a forklift). Usually set at not more than 5%. It covers the 'noise' in the production system." },
    { title: "Slide 8: Policy Allowance", content: "This is not engineering; it's Management. Example: Union Negotiation. If a Union demands an extra 10-minute tea break, this is added as a 'Policy Allowance' to the Standard Time." },
    { title: "Slide 9: The Standard Time Formula", content: "The Golden Formula: Standard Time = Normal Time + (Normal Time × Allowance %). Or: ST = NT × (1 + Allowance Factor). Memorize this formula for your assessment." },
    { title: "Slide 10: Practical Example (Bottling Plant)", content: "Inspection Task: OT = 4.0s. Rating = 90 (Slow). NT = 4.0 × 0.9 = 3.6s. Allowance = 15%. ST = 3.6 + (15% of 3.6) = 3.6 + 0.54 = 4.14 seconds." },
    { title: "Slide 11: Converting to Output", content: "Bosses care about 'How many per hour?'. Formula: Standard Output = 1 Hour / Standard Time per Unit. From Slide 10: 3600 seconds / 4.14 seconds = 869 bottles per hour." },
    { title: "Slide 12: Machine Interference Allowance", content: "When one worker manages multiple machines, sometimes Machine A stops while he fixes Machine B. We add an 'Interference Allowance' to account for this waiting so the worker doesn't lose pay." },
    { title: "Slide 13: Clean-Up & Startup Allowance", content: "Workers need time to oil machines in the morning and clean dust/chips in the evening. This is usually a lump sum (e.g., 20 mins/day) converted into a percentage per unit produced." },
    { title: "Slide 14: The Effect on Cost", content: "Forget Allowances and: 1. You'll promise 1000 units but produce 850. 2. You'll under-price the product. 3. Workers will strike due to burnout. Allowances protect the company's financial health." },
    { title: "Slide 15: Module Conclusion", content: "Engineering is about the human operating the machine. Standard Time is the fair time. In the quiz, you will calculate these values. Use your calculator! Good luck, Engineer." }
  ],
  4: [
    { title: "Slide 1: What is PPC?", content: "Production Planning & Control (PPC) is the 'Brain' of the manufacturing system. While the machines provide the 'Muscle,' PPC decides What to produce, When to produce it, and How much to produce. Without PPC, a factory is chaos." },
    { title: "Slide 2: The Four Pillars of PPC", content: "PPC consists of four distinct phases: Routing (The Where), Scheduling (The When), Dispatching (The Action), and Follow-up / Expediting (The Control). Each must happen in order for success." },
    { title: "Slide 3: Phase 1: Routing (The 'Where')", content: "Routing determines the path work follows. It specifies the sequence of operations (e.g., Cut -> Drill -> Paint -> Pack). Key Document: The 'Route Sheet', listing needed machines and standard times." },
    { title: "Slide 4: Phase 2: Scheduling (The 'When')", content: "Scheduling assigns start and finish times to each job. It ensures that the 'Cut' is finished before the 'Drill' starts. Tool: The Gantt Chart is standard for visualizing the schedule against time." },
    { title: "Slide 5: Phase 3: Dispatching (The 'Action')", content: "Dispatching is the release of orders to the shop floor. It is the moment paperwork turns into work. Activities: Issuing drawings, job cards, and raw materials. It is the 'Authorization to Start'." },
    { title: "Slide 6: Phase 4: Follow-up / Expediting (The 'Control')", content: "Plans fail when machines break or workers are sick. Expediting tracks progress against the Schedule. If a job is late, the 'Expediter' rushes it through to meet the deadline and protect customer trust." },
    { title: "Slide 7: Master Production Schedule (MPS)", content: "The MPS is the high-level plan derived from customer orders and sales forecasts. It tells the factory: 'We need 5,000 units by December.' Detailed schedules are calculated only after the MPS is set." },
    { title: "Slide 8: Material Requirements Planning (MRP)", content: "MRP is a computer system that looks at the Bill of Materials (BOM) and calculates exactly how many screws, tires, and seats we need to order so they arrive exactly when needed for assembly." },
    { title: "Slide 9: Types of Production: Job Shop", content: "Low Volume, High Variety. Example: Custom furniture or specialized tool shops. PPC Challenge: Scheduling is very difficult because every job is unique and requires different processing paths." },
    { title: "Slide 10: Types of Production: Mass Production", content: "High Volume, Low Variety. Example: Bottling soft drinks or car assembly. PPC Challenge: Line Balancing. If one machine stops, the whole line stops. Perfect synchronization is mandatory." },
    { title: "Slide 11: Capacity Planning", content: "Design Capacity: Theoretical maximum output. Effective Capacity: Real output after maintenance/breaks. Utilization Formula: (Actual Output / Design Capacity) × 100. Overloading leads to failure." },
    { title: "Slide 12: Bottleneck Analysis", content: "A factory is only as fast as its slowest machine, called the Bottleneck. Rule: Time lost at a bottleneck is lost for the whole system. Time saved at a non-bottleneck is an illusion of efficiency." },
    { title: "Slide 13: Loading (Infinite vs. Finite)", content: "Infinite Loading: Assigning work without looking at capacity. Finite Loading: Assigning work based on actual available Standard Hours. Professional engineers always use Finite Loading." },
    { title: "Slide 14: Just-In-Time (JIT)", content: "A philosophy from Toyota aiming for Zero Inventory. Raw materials arrive exactly when the machine is ready. This reduces 'Holding Costs' (rent, spoilage) but requires perfect, high-precision scheduling." },
    { title: "Slide 15: Module Conclusion", content: "PPC is about reliability. If you promise a customer delivery on Friday, PPC ensures it's ready. Late delivery kills business faster than high prices. Ready for your assessment? Success depends on your plan." }
  ],
  5: [
    { title: "Slide 1: Safety First (The Golden Rule)", content: "In Production Engineering, Safety is not 'common sense'—it is a Science. The Factories Act in Nigeria mandates every worker has the right to a safe environment. An accident stops the line immediately. Therefore, Safety = Productivity." },
    { title: "Slide 2: The Iceberg Theory of Accidents", content: "For every 1 major injury (fatal), there are 29 minor injuries and 300 'Near Misses.' Lesson: If you ignore near misses (slipping but not falling), a fatality is guaranteed eventually. We must report every unsafe occurrence." },
    { title: "Slide 3: Unsafe Acts vs. Unsafe Conditions", content: "Accidents have root causes: 1. Unsafe Acts (88%): Human error (e.g. removing guards, horseplay, no PPE). 2. Unsafe Conditions (10%): Management failure (e.g. oil spills, exposed wires, dim lighting)." },
    { title: "Slide 4: The Hierarchy of Controls", content: "How do we stop hazards? Follow this order: 1. Elimination (Remove hazard). 2. Substitution (Replace machine/chemical). 3. Engineering Controls (Add guards). 4. Admin Controls (Signs/Training). 5. PPE (Last Line of Defense)." },
    { title: "Slide 5: PPE - Head & Eye Protection", content: "Hard Hat: Protects against falling objects in construction. Safety Goggles: Mandatory for grinding, welding, or chemicals. Flying metal chips cause permanent blindness in milliseconds. Never take them off on the floor." },
    { title: "Slide 6: PPE - Respiratory & Hearing", content: "Respirators: Protect against dust (Silicosis) and fumes. Ear Defenders: Mandatory in high-noise areas (>85 decibels). Hearing loss is gradual and irreversible; once it's gone, it's gone forever." },
    { title: "Slide 7: PPE - Hands & Feet", content: "Gloves: Leather for heat, Nitrile for chemicals. Warning: Never wear loose gloves near rotating machinery—they pull hands in. Safety Boots: Steel-toed boots protect against 'Crush Injuries' from falling heavy dies/parts." },
    { title: "Slide 8: Ergonomics (Fitting Task to Man)", content: "Ergonomics is the study of people's efficiency in their workspace. Bad: Bending 500 times/day. Good: Raising the table so the worker stands straight. Goal: Reduce fatigue and Musculoskeletal Disorders (MSDs)." },
    { title: "Slide 9: Anthropometry", content: "This is the measurement of the human body (reach, height, strength). Engineers design for the '5th to 95th Percentile'. If a lever is too high for a short person, it is a design failure and a safety hazard." },
    { title: "Slide 10: Manual Lifting Technique", content: "Back injuries are the #1 cause of lost workdays. Correct Way: Keep back straight (Neutral Spine), Bend the knees, Hold load close to the body (Center of Gravity), Lift with legs, not the back." },
    { title: "Slide 11: Machine Guarding", content: "Moving parts (gears, belts, pulleys) create 'Pinch Points' or 'Nip Points'. Rule: If it moves, it must be guarded. A worker should never be able to touch a moving gear or belt while the machine is live." },
    { title: "Slide 12: Fire Safety (Classes of Fire)", content: "Class A: Wood/Paper (Water/Foam). Class B: Liquids/Petrol (Foam/CO2 - Never Water). Class C: Electrical (CO2/Dry Powder - Never Water). Using water on an electrical fire can lead to instant electrocution." },
    { title: "Slide 13: Lockout / Tagout (LOTO)", content: "When repairing, turning off is not enough. LOTO: The maintenance engineer puts a physical padlock on the power switch and keeps the key. The machine cannot start until he personally removes the lock. This saves lives." },
    { title: "Slide 14: 5S Housekeeping", content: "A safe workplace is clean. 1. Seiri (Sort). 2. Seiton (Order). 3. Seiso (Shine). 4. Seiketsu (Standardize). 5. Shitsuke (Sustain). Slips, Trips, and Falls account for 15% of all accidental industrial deaths." },
    { title: "Slide 15: Module Conclusion", content: "An unsafe worker is a liability. An ergonomic workstation produces more units because the worker is comfortable. In the quiz, you will identify hazards and choose correct PPE. Safety is your first job as an engineer." }
  ],
  6: [
    { title: "Slide 1: What is Inventory?", content: "Inventory is the stock of physical goods a business holds to facilitate production or satisfy demand. In Accounting, it is an 'Asset,' but in Production Engineering, it is often a 'Liability' because it ties up working capital. Money sitting on a shelf cannot pay salaries." },
    { title: "Slide 2: The Three Types of Inventory", content: "1. Raw Materials: Steel, sugar, plastic (Inputs). 2. Work-In-Progress (WIP): Partly finished goods on the factory floor (bottleneck buffer). 3. Finished Goods: Completed units waiting for shipment. Each type costs money to hold." },
    { title: "Slide 3: The Inventory Conflict", content: "Sales wants High Inventory (never say 'Out of Stock'). Finance wants Low Inventory (keep cash free). The Production Engineer balances these using Mathematics (EOQ) to find the most efficient stock level." },
    { title: "Slide 4: Inventory Costs (The Trade-off)", content: "Ordering Cost: Paperwork, transport, inspection. Bulk buying reduces this. Holding Cost (Carrying Cost): Rent, power, security, insurance, spoilage. Bulk buying increases this. We aim to minimize the sum of both." },
    { title: "Slide 5: Economic Order Quantity (EOQ)", content: "EOQ is the quantity that minimizes Total Cost. Formula: EOQ = √((2 * D * S) / H). D = Annual Demand, S = Ordering Cost, H = Holding Cost. This formula tells you exactly how much to buy per order." },
    { title: "Slide 6: Reorder Point (ROP)", content: "When do you order? Don't wait until the shelf is empty. Order when stock drops to the Reorder Point. Formula: ROP = (Daily Demand * Lead Time) + Safety Stock. Lead Time is how long the supplier takes to deliver." },
    { title: "Slide 7: Safety Stock (Buffer Stock)", content: "In Nigeria, supply chains are unpredictable (Port delays, breakdowns). We keep extra 'Safety Stock' to prevent a Stockout. A Stockout is a disaster—the factory stops, but overhead costs like rent continue to accumulate." },
    { title: "Slide 8: ABC Analysis (Pareto Principle)", content: "Class A: High Value (70%), Small Qty (10%). Manage strictly. Class B: Medium Value. Manage moderately. Class C: Low Value (5%), High Qty (Bolts/Nuts). Manage loosely (Bin system). Focus where the money is." },
    { title: "Slide 9: Just-In-Time (JIT)", content: "A Toyota philosophy aiming for Zero Inventory. Material arrives exactly when the machine needs it. Pros: Saves massive warehouse costs. Cons: High risk. If a truck breaks down, the whole factory stops immediately." },
    { title: "Slide 10: Kanban System", content: "Kanban means 'Visual Signal' in Japanese. In a JIT system, you do not produce until you receive a card from the downstream process. It pulls production based on actual demand rather than pushing based on guesses." },
    { title: "Slide 11: Supply Chain Management (SCM)", content: "SCM manages flow from the 'Earth to the Customer.' Upstream: Suppliers (Raw materials). Downstream: Distributors and Retailers. Production Engineering optimizes the internal part of this global chain." },
    { title: "Slide 12: The Bullwhip Effect", content: "Small changes in customer demand cause massive fluctuations in orders upstream. A 5% sales increase might lead a factory to order 20% more raw material due to panic. Shared information prevents this waste." },
    { title: "Slide 13: Vendor Managed Inventory (VMI)", content: "Instead of you counting stock, the Supplier monitors your warehouse and refills it automatically (like Coke restocking a shop fridge). This shifts the risk and holding cost management to the supplier." },
    { title: "Slide 14: FIFO vs. LIFO", content: "FIFO (First-In, First-Out): Oldest stock is used first. Mandatory for perishables like food or chemicals. LIFO (Last-In, First-Out): Newest stock first. Used rarely in production, mostly for accounting/tax strategies." },
    { title: "Slide 15: Module Conclusion", content: "Inventory is a necessary evil. Too much kills cash flow; too little kills production. Your job as an Engineer is to find the 'Sweet Spot' using EOQ. Prepare your calculator—the quiz will test your math. Good luck!" }
  ],
  7: [
    { title: "Slide 1: What is Quality?", content: "Quality is not just 'Luxury.' In Engineering, Quality means 'Fitness for Purpose' (Juran) or 'Conformance to Requirements' (Crosby). A cheap pen that writes is High Quality for its specification; a gold pen that leaks is Low Quality." },
    { title: "Slide 2: Evolution of Quality", content: "1. Inspection: Sorting bad from good after work (Expensive waste). 2. Quality Control (QC): Detecting defects during production. 3. Quality Assurance (QA): Preventing defects before they happen by designing better processes." },
    { title: "Slide 3: The Cost of Quality (COQ)", content: "Quality is free; non-quality costs money. Prevention: Training (Good). Appraisal: Inspection (Necessary). Failure: Scrap, Rework, Warranty claims (Bad). The goal is to spend more on Prevention to eliminate Failure costs." },
    { title: "Slide 4: Total Quality Management (TQM)", content: "TQM is a philosophy where everyone, from CEO to Cleaner, is responsible for Quality. It is not just the job of the QC department. It focuses on 100% Customer Satisfaction through continuous worker engagement." },
    { title: "Slide 5: The PDCA Cycle (Deming Wheel)", content: "Scientific method for improvement: Plan (Identify problem), Do (Test solution on small scale), Check (Measure results), Act (Standardize solution). Continuous rotation leads to industrial excellence." },
    { title: "Slide 6: Six Sigma (The Gold Standard)", content: "Six Sigma is a data-driven methodology to eliminate defects. Statistical Goal: 3.4 Defects Per Million Opportunities (DPMO). This means 99.99966% perfection in every process." },
    { title: "Slide 7: DMAIC Methodology", content: "The core Six Sigma process: Define (Problem?), Measure (Data?), Analyze (Root Cause?), Improve (Fix it), Control (Keep it fixed). This methodology turns complex problems into structured statistical tasks." },
    { title: "Slide 8: The Belts (Roles)", content: "Six Sigma uses martial arts ranks: Yellow Belt (Awareness), Green Belt (Leads small projects), Black Belt (Full-time expert/leader), Master Black Belt (Trains others). Every engineer should aim for Green Belt status." },
    { title: "Slide 9: The 7 QC Tools: Pareto Chart (80/20)", content: "A bar chart separating the 'Vital Few' from the 'Trivial Many.' Principle: 80% of defects come from 20% of causes. Focus your limited engineering time on the biggest bars first!" },
    { title: "Slide 10: The 7 QC Tools: Fishbone Diagram", content: "Also called Ishikawa or Cause-and-Effect diagram. It maps causes to effects using the 6Ms: Man, Machine, Material, Method, Measurement, Mother Nature. It ensures you find the root cause, not just symptoms." },
    { title: "Slide 11: The 7 QC Tools: Control Charts (SPC)", content: "Graphs plotting data against time with UCL (Upper) and LCL (Lower) control limits. If a point falls outside, the process is 'Out of Control.' Stop production immediately to investigate the 'Special Cause' of variation." },
    { title: "Slide 12: Kaizen (Continuous Improvement)", content: "Kaizen means 'Change for the Better.' It relies on small, daily improvements suggested by workers on the shop floor rather than massive, expensive engineering overhauls. Small gains lead to big profits." },
    { title: "Slide 13: Poka-Yoke (Mistake Proofing)", content: "A mechanism making mistakes impossible. Example: A SIM card's cut corner ensures correct insertion. Example: A microwave won't start if the door is open. As an engineer, design processes that cannot fail." },
    { title: "Slide 14: ISO 9000 Standards", content: "ISO 9001 certifies a company has a consistent Quality Management System. It guarantees the process, not the product itself. In Nigeria, the Standards Organization of Nigeria (SON) enforces these global norms." },
    { title: "Slide 15: Module Conclusion", content: "Speed without Quality is industrial suicide. Making 1,000 bad units per hour is just creating waste faster. Use Pareto and Fishbone tools to solve problems scientifically. Now, prove your mastery in the quiz. Good luck!" }
  ],
  8: [
    { title: "Slide 1: What is Plant Layout?", content: "Plant Layout is the physical arrangement of industrial facilities—machines, storage, aisles, and offices. The primary goal is to minimize the movement of material and people. In production, any step taken that does not add value is 'Waste' (Muda)." },
    { title: "Slide 2: Objectives of Good Layout", content: "1. Minimize Material Handling Cost: Move goods the shortest distance. 2. Eliminate Bottlenecks: Ensure smooth flow. 3. Safety: Separate people from hazards like forklifts. 4. Flexibility: Allow for future changes in machine size or quantity." },
    { title: "Slide 3: Layout Type 1: Product Layout", content: "Also called Line Layout. Machines are arranged in the sequence of operations. Best for High Volume, Low Variety (Mass Production). Example: Innoson Motors or Coca-Cola bottling lines. Pro: Fast processing. Con: Line stops if one machine breaks." },
    { title: "Slide 4: Layout Type 2: Process Layout", content: "Also called Functional Layout. Machines are grouped by function (e.g. all welding in one zone). Best for Low Volume, High Variety (Job Shop). Example: A repair workshop or hospital. Pro: Highly flexible. Con: Lots of backtracking and long travel times." },
    { title: "Slide 5: Layout Type 3: Fixed Position Layout", content: "The product is too big to move. It stays in one spot, and workers/machines come to it. Used for mega-projects like building a Ship, an Aircraft, or a Bridge. It requires high coordination of mobile equipment." },
    { title: "Slide 6: Layout Type 4: Cellular Layout", content: "A hybrid layout where dissimilar machines are grouped into a 'Cell' to produce a 'Family of Parts' (e.g. a gearbox cell). It reduces setup time and material handling, supporting Lean Manufacturing principles." },
    { title: "Slide 7: Material Handling (MH)", content: "Material Handling is moving, storing, and controlling materials. Crucial Fact: MH adds Cost but adds No Value. The customer won't pay extra because you moved a box 5 times. As an engineer, your job is to minimize it." },
    { title: "Slide 8: MH Principle 1: Gravity", content: "Gravity is free energy. Always use it where possible (e.g. gravity chutes or downward-aimed roller conveyors). This reduces electricity costs and maintenance compared to powered motor systems." },
    { title: "Slide 9: MH Principle 2: Unit Load", content: "Move as much as possible in one go. Instead of carrying 50 small boxes individually, stack them on a Pallet and move them all together with a forklift. This 'Unit Load' strategy maximizes labor productivity." },
    { title: "Slide 10: MH Equipment: Conveyors", content: "Used for moving uniform loads continuously over a fixed path. 1. Belt Conveyor (loose materials). 2. Roller Conveyor (boxes/pallets). 3. Overhead Conveyor (painting lines). They keep floor space clear and flow predictable." },
    { title: "Slide 11: MH Equipment: Industrial Trucks", content: "Used for variable paths and intermittent movement. Forklifts: The workhorse for vertical/horizontal movement. Pallet Jacks: Simple horizontal transport. AGV (Automated Guided Vehicles): Robotic trucks following a floor path." },
    { title: "Slide 12: MH Equipment: Cranes & Hoists", content: "Used for lifting heavy loads vertically and moving them within a limited area. Overhead Bridge Cranes run on ceiling rails. Jib Cranes are attached to wall pillars for specific workstation lifting." },
    { title: "Slide 13: Systematic Layout Planning (SLP)", content: "Developed by Richard Muther. Key tool: The REL Chart (Relationship Chart). It uses codes like A (Absolutely necessary), O (Ordinary), and X (Undesirable) to determine which departments must be neighbors." },
    { title: "Slide 14: Flow Patterns", content: "Straight Line: For simple processes. U-Shaped: Popular in Lean; entrance/exit are visible to one supervisor. S-Shaped (Zig-Zag): Used to fit a very long production line into a square or limited room space." },
    { title: "Slide 15: Module Conclusion", content: "A factory is like a living organism. If the arteries (aisles) are blocked or layout is poor, efficiency dies. Design layouts where material flows like water—smoothly and without stagnation. Now, prove your mastery in the quiz!" }
  ],
  9: [
    { title: "Slide 1: Engineering Economics", content: "Why does an Engineer need to know Accounting? Because every engineering decision—from selecting a material to choosing a machine—is a financial decision. Every project must justify its cost. Rule: Profit = Revenue - Cost. Your primary job is to minimize Cost through efficiency." },
    { title: "Slide 2: Types of Costs: Fixed vs. Variable", content: "Fixed Costs (FC): Costs that do not change with production volume, like Rent, Security salaries, and Insurance. Even if you produce zero units, you pay this. Variable Costs (VC): Costs that increase directly with every unit produced, such as Raw Materials, Direct Labor, and Machine Electricity." },
    { title: "Slide 3: Total Cost Formula", content: "Total Cost (TC) = Fixed Cost + (Variable Cost per Unit × Quantity). Example: Factory Rent is N100,000. Material per shoe is N500. If you make 10 shoes, TC = 100,000 + (500 × 10) = N105,000. This formula is vital for pricing and profitability analysis." },
    { title: "Slide 4: Direct vs. Indirect Costs (Overheads)", content: "Direct Costs: Can be traced specifically to one product (e.g., the steel in a bolt). Indirect Costs (Overheads): Cannot be traced to a single unit (e.g., Factory Manager salary, generator oil). These must be 'Allocated'—shared among all products based on labor hours or machine time." },
    { title: "Slide 5: Break-Even Analysis", content: "The Break-Even Point (BEP) is the exact number of units you must sell to cover ALL your costs. Below BEP: You are making a Loss. At BEP: Profit is exactly zero. Above BEP: You are finally making a Profit. Finding the BEP is the first step in any industrial venture." },
    { title: "Slide 6: The Contribution Margin", content: "This is the profit made on one unit BEFORE paying Fixed Costs. Formula: Contribution = Selling Price (SP) - Variable Cost (VC). If you sell a pen for N100 and it cost N40 to make, your Contribution is N60. This N60 is then used to 'chip away' at your monthly Rent." },
    { title: "Slide 7: The Break-Even Formula", content: "Memorize this! BEP (in units) = Fixed Costs / (Selling Price - Variable Cost). Example: Rent = N1,000. Price = N10. VC = N5. BEP = 1,000 / (10 - 5) = 200 Units. You must sell 200 units just to keep the lights on and pay the landlord." },
    { title: "Slide 8: Make vs. Buy Decision", content: "Should we manufacture a part or buy it? Make: If you have idle machines, excess labor, and the volume is high. Buy: If volume is low or the supplier has better specialized technology. Analysis: Compare the Variable Cost of making against the supplier's Purchase Price." },
    { title: "Slide 9: Opportunity Cost", content: "This is the benefit you GAVE UP by choosing one option over another. Example: If you use your factory space to make Tables, you cannot make Chairs. The profit you would have made on those Chairs is the 'Opportunity Cost' of choosing to make Tables." },
    { title: "Slide 10: Depreciation (Asset Value Loss)", content: "Machines lose value over time due to wear and tear. Straight Line Method Formula: (Initial Cost - Scrap Value) / Useful Life in Years. We must account for this loss as a monthly cost so we can eventually afford to buy a replacement machine." },
    { title: "Slide 11: Sunk Costs", content: "Money that has already been spent and cannot be recovered. Example: You spent N5 million repairing an old machine and it still failed. Decision Rule: Do not throw good money after bad. Ignore the N5m (Sunk Cost) and decide based on future costs only." },
    { title: "Slide 12: Standard Costing", content: "Setting a 'Budget' for what a product SHOULD cost. Variance Analysis: At month-end, compare Standard vs. Actual Cost. Favorable Variance: Actual cost was lower (Good). Adverse Variance: Actual cost was higher (Bad—investigate why! Wastage? Price spikes?)." },
    { title: "Slide 13: Economies of Scale", content: "As you produce more, the Fixed Cost is spread over more units, reducing the Cost Per Unit. 100 units: Rent N1000 / 100 = N10/unit. 1000 units: Rent N1000 / 1000 = N1/unit. This is why Mass Production allows companies to lower prices and beat competitors." },
    { title: "Slide 14: Life Cycle Costing", content: "Don't just look at the purchase price. Look at the cost to run the machine for its whole life. Machine A: Cost N1m, cheap to run. Machine B: Cost N500k, uses massive fuel. Over 10 years, Machine A is often the smarter, cheaper engineering choice." },
    { title: "Slide 15: Module Conclusion", content: "An Engineer who cannot calculate Break-Even is a danger to the company's survival. If you set prices lower than costs, the company goes bankrupt. Mastering these financial tools separates 'Dreamers' from 'Managers.' Now, prepare for the quiz—get your calculator ready!" }
  ],
  10: [
    { title: "Slide 1: What is Maintenance?", content: "Maintenance is the combination of all technical and administrative actions intended to retain an item in, or restore it to, a state in which it can perform its required function. Repair: Fixing it after it breaks (Failure). Maintenance: Keeping it running before it breaks (Prevention)." },
    { title: "Slide 2: The Bathtub Curve", content: "The failure rate of a machine over time follows a bathtub curve. 1. Infant Mortality: High failures at the start (Installation errors). 2. Useful Life: Low, constant failure rate (Normal operation). 3. Wear-out Zone: High failures at the end (Old age). Your strategy must adapt to the age of the machine." },
    { title: "Slide 3: Breakdown Maintenance (Corrective)", content: "The 'Old School' method: Run the machine until it smokes or stops, then fix it. Pros: No planning required. Cons: Catastrophic damage, unplanned downtime, high overtime costs. Only use this for cheap, non-critical items like lightbulbs." },
    { title: "Slide 4: Preventive Maintenance (PM)", content: "Scheduled maintenance based on Time or Usage (e.g. changing car oil every 5,000km). Goal: Replace parts before they wear out. Pros: Reduces catastrophic failures. Cons: You might replace a part that is still perfectly good, leading to unnecessary cost." },
    { title: "Slide 5: Predictive Maintenance (PdM)", content: "The 'Smart' method. Monitor machine condition while it runs using tools like Vibration Analysis, Thermography, and Oil Analysis. Action: Fix it only when the sensor data says it is about to break. This is a core component of Industry 4.0." },
    { title: "Slide 6: Total Productive Maintenance (TPM)", content: "A Japanese philosophy where Operators—not just mechanics—are responsible for their machines. 'Autonomous Maintenance' means the operator cleans, lubricates, and tightens bolts daily. The motto: 'I operate, I maintain.'" },
    { title: "Slide 7: OEE (Overall Equipment Effectiveness)", content: "The Gold Standard metric for efficiency. Formula: OEE = Availability × Performance × Quality. World-Class OEE is considered 85%. A typical factory usually sits around 60%. Improving OEE is the fastest way to increase industrial profit." },
    { title: "Slide 8: Reliability (MTBF)", content: "Mean Time Between Failures (MTBF): The average time a machine runs without stopping. Formula: Total Run Time / Number of Failures. Goal: Engineers want the highest possible MTBF to ensure continuous, predictable production flow." },
    { title: "Slide 9: Maintainability (MTTR)", content: "Mean Time To Repair (MTTR): How long it takes to fix the machine when it inevitably breaks. Formula: Total Downtime / Number of Failures. Goal: Design machines that are easy to access and fix to keep MTTR low and repair speed high." },
    { title: "Slide 10: Availability Calculation", content: "Availability is the probability that a machine is ready to run when needed. Formula: Availability = MTBF / (MTBF + MTTR). To maximize availability, we must increase the time between failures and decrease the time taken to repair them." },
    { title: "Slide 11: The Cost of Downtime", content: "When a machine stops, you lose: 1. Idle Labor (Workers doing nothing). 2. Lost Production (Sales you missed). 3. Startup Scrap (Bad products made during restart). Reliable maintenance is always cheaper than unplanned downtime." },
    { title: "Slide 12: Root Cause Analysis (RCA)", content: "When a machine breaks, don't just fix the symptom. Ask 'Why?' 5 times. Example: Fuse blew -> Motor overheated -> Lack of oil -> Oil pump failed. Fix the pump (The Root Cause), not just the fuse, or it will happen again tomorrow." },
    { title: "Slide 13: Lubrication (Tribology)", content: "Friction is the enemy of production. 50% of bearing failures are due to poor lubrication. Over-greasing: Causes overheating. Under-greasing: Causes metal wear. Wrong Grease: Causes chemical failure. Precision lubrication is a high-level engineering task." },
    { title: "Slide 14: Spare Parts Management", content: "A balance between 'Holding Cost' and 'Stockout Risk.' Insurance Spares: Expensive items like main motors kept for 10 years 'just in case.' Consumables: Fast-moving parts like filters and belts. Keep just enough so production never stops." },
    { title: "Slide 15: Module Conclusion", content: "A Production Engineer who ignores maintenance is managing a ticking time bomb. High OEE through TPM and Predictive tools is the key to global competitiveness. In the quiz, you will calculate Availability and OEE. Study the formulas well—Good luck!" }
  ]
};

const SlideDeck: React.FC<Props> = ({ moduleId, moduleTitle, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => {
    return moduleContent[moduleId] || moduleContent[1];
  }, [moduleId]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const progressPercentage = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-2 text-indigo-900">
           <GraduationCap size={20} />
           <span className="font-bold text-[10px] sm:text-xs uppercase tracking-tight line-clamp-1">{moduleTitle}</span>
         </div>
         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">
           Slide {currentSlide + 1} / {slides.length}
         </div>
      </div>
      
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex-grow flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 relative min-h-[350px] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <GraduationCap size={120} />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-6 leading-tight border-b-4 border-indigo-600 pb-4 inline-block">
            {slides[currentSlide].title}
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            {slides[currentSlide].content}
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 flex gap-4 items-center">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 font-bold border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} /> PREV
        </button>
        
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={onComplete}
            className="flex-[2] py-4 flex items-center justify-center gap-3 bg-green-600 text-white font-black rounded-xl shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all animate-pulse"
          >
            START CBT <CheckCircle size={20} />
          </button>
        ) : (
          <button
            onClick={nextSlide}
            className="flex-[2] py-4 flex items-center justify-center gap-2 bg-indigo-600 text-white font-black rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            NEXT SLIDE <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SlideDeck;
