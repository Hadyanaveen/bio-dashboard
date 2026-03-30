let bmiChartInstance = null;
let heartChartInstance = null;

function analyzeHealth() {
  let name = document.getElementById("name").value;
  let age = parseInt(document.getElementById("age").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let heightCm = parseFloat(document.getElementById("height").value);
  let result = document.getElementById("result");

  if (!name || !age || !weight || !heightCm) {
    result.innerHTML = "Please fill all fields!";
    return;
  }

  let height = heightCm / 100;

  // 🧮 BMI
  let bmi = (weight / (height * height)).toFixed(2);

  let bmiStatus = "";
  if (bmi < 18.5) bmiStatus = "Underweight";
  else if (bmi < 25) bmiStatus = "Normal";
  else if (bmi < 30) bmiStatus = "Overweight";
  else bmiStatus = "Obese";

  // ❤️ HEART RATE (FIXED POSITION ✅)
  let minHR, maxHR;

  if (age < 13) {
    minHR = 70; maxHR = 100;
  }
  else if (age < 20) {
    minHR = 65; maxHR = 100;
  }
  else if (age < 40) {
    minHR = 60; maxHR = 100;
  }
  else {
    minHR = 60; maxHR = 95;
  }

  let heartRate = `${minHR}–${maxHR} bpm`;
  let pulse = heartRate;

  // 💧 WATER
  let waterLiters = (weight * 0.035).toFixed(2);

  // 🔥 CALORIES
  let calories = "";
  if (age < 18) calories = "2000–2400 kcal";
  else if (age < 40) calories = "1800–2200 kcal";
  else calories = "1600–2000 kcal";

  // 🏃 EXERCISE
  let exercise = "";
  if (bmiStatus === "Overweight" || bmiStatus === "Obese") {
    exercise = "45–60 mins cardio + strength training daily";
  } else if (bmiStatus === "Underweight") {
    exercise = "Light strength training + yoga (30 mins)";
  } else {
    exercise = "30–45 mins daily (mix of cardio + strength)";
  }

  // 🧪 VITAMINS
  let vitamins = `
    Vitamin A: 700–900 mcg<br>
    Vitamin C: 75–90 mg<br>
    Vitamin D: 600–800 IU<br>
    Calcium: 1000 mg<br>
    Iron: 8–18 mg
  `;

  // 🥗 AGE-BASED FOOD
  let vitaminFoods = "";

  if (age < 13) {
    vitaminFoods = `
      🥛 Milk, cheese<br>
      🍌 Banana, apple<br>
      🥕 Carrot, spinach<br>
      🌾 Lentils, beans
    `;
  }
  else if (age < 20) {
    vitaminFoods = `
      🥬 Spinach, beetroot<br>
      🍊 Orange, berries<br>
      🥜 Almonds, walnuts<br>
      🌾 Chickpeas, lentils
    `;
  }
  else if (age < 40) {
    vitaminFoods = `
      🥦 Broccoli, greens<br>
      🐟 Fish, eggs<br>
      🌰 Flax seeds, chia seeds<br>
      🌾 Oats, brown rice
    `;
  }
  else {
    vitaminFoods = `
      🥛 Low-fat dairy<br>
      🍎 Fruits<br>
      🌰 Nuts & seeds<br>
      🌾 Whole grains
    `;
  }

  // 🤖 AI TIP
  let aiTip = "";
  if (bmiStatus === "Overweight" || bmiStatus === "Obese") {
    aiTip = "Reduce sugar, avoid junk, increase activity.";
  } else if (bmiStatus === "Underweight") {
    aiTip = "Increase calories and protein.";
  } else {
    aiTip = "Maintain your healthy lifestyle!";
  }

  // 🏥 CHECKUPS
  let checkups = age < 20 
    ? "Blood test, eye checkup"
    : age < 40 
    ? "BP, cholesterol, sugar test"
    : "ECG, bone density, sugar test";

  // ✅ OUTPUT
  result.innerHTML = `
    <h2>Hello ${name} 👋</h2>

    <p><b>🧮 BMI:</b> ${bmi} (${bmiStatus})</p>

    <p><b>❤️ Heart Rate:</b> ${heartRate}</p>
    <p><b>💓 Pulse:</b> ${pulse}</p>

    <p><b>💧 Water Intake:</b> ${waterLiters} L</p>

    <p><b>🔥 Calories:</b> ${calories}</p>

    <p><b>🏃 Exercise:</b> ${exercise}</p>

    <p><b>🧪 Vitamins:</b><br>${vitamins}</p>

    <p><b>🥗 Foods:</b><br>${vitaminFoods}</p>

    <p><b>🤖 AI Tip:</b> ${aiTip}</p>

    <p><b>🏥 Checkups:</b> ${checkups}</p>
  `;

  // 📊 DESTROY OLD CHARTS (IMPORTANT FIX)
  if (bmiChartInstance) bmiChartInstance.destroy();
  if (heartChartInstance) heartChartInstance.destroy();

  // 📊 BMI CHART
  bmiChartInstance = new Chart(document.getElementById("bmiChart"), {
    type: "bar",
    data: {
      labels: ["Underweight", "Normal", "Overweight", "Your BMI"],
      datasets: [{
        label: "BMI Comparison",
        data: [18.5, 24.9, 29.9, bmi]
      }]
    }
  });

  // ❤️ HEART CHART
  heartChartInstance = new Chart(document.getElementById("heartChart"), {
    type: "line",
    data: {
      labels: ["Minimum", "Maximum"],
      datasets: [{
        label: "Heart Rate Range",
        data: [minHR, maxHR]
      }]
    }
  });
}