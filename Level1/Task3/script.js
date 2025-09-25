document.addEventListener("DOMContentLoaded", () => {
  // --- Get DOM Elements ---
  const fromValueInput = document.getElementById("fromValue");
  const toValueDisplay = document.getElementById("toValue");
  const fromUnitsSelector = document.getElementById("fromUnits");
  const toUnitsSelector = document.getElementById("toUnits");
  const swapBtn = document.getElementById("swapBtn");

  // --- State Variables ---
  let fromUnit = "fahrenheit";
  let toUnit = "celsius";

  // --- Functions ---

  /**
   * Performs the temperature conversion based on current state
   */
  function convertTemperature() {
    const value = parseFloat(fromValueInput.value);

    // If input is not a valid number, clear the result and exit
    if (isNaN(value)) {
      toValueDisplay.textContent = "--";
      return;
    }

    let result;

    // --- Conversion Logic ---

    // From Celsius
    if (fromUnit === "celsius") {
      if (toUnit === "fahrenheit") {
        result = (value * 9) / 5 + 32;
      } else if (toUnit === "kelvin") {
        result = value + 273.15;
      } else {
        result = value; // Celsius to Celsius
      }
    }

    // From Fahrenheit
    else if (fromUnit === "fahrenheit") {
      if (toUnit === "celsius") {
        result = ((value - 32) * 5) / 9;
      } else if (toUnit === "kelvin") {
        result = ((value - 32) * 5) / 9 + 273.15;
      } else {
        result = value; // Fahrenheit to Fahrenheit
      }
    }

    // From Kelvin
    else if (fromUnit === "kelvin") {
      if (toUnit === "celsius") {
        result = value - 273.15;
      } else if (toUnit === "fahrenheit") {
        result = ((value - 273.15) * 9) / 5 + 32;
      } else {
        result = value; // Kelvin to Kelvin
      }
    }

    // Display the result rounded to 2 decimal places
    toValueDisplay.textContent = result.toFixed(2);
  }

  /**
   * Updates the active class for a unit selector
   * @param {HTMLElement} selector - The unit selector container
   * @param {string} newUnit - The new unit to be marked as active
   */
  function updateActiveButton(selector, newUnit) {
    // Remove 'active' class from all buttons within the selector
    selector.querySelectorAll(".unit-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add 'active' class to the button corresponding to the new unit
    const activeButton = selector.querySelector(`[data-unit="${newUnit}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  // --- Event Listeners ---

  // Listen for input in the 'from' value field
  fromValueInput.addEventListener("input", convertTemperature);

  // Listen for clicks on the 'from' unit selector
  fromUnitsSelector.addEventListener("click", (e) => {
    if (e.target.classList.contains("unit-btn")) {
      fromUnit = e.target.dataset.unit;
      updateActiveButton(fromUnitsSelector, fromUnit);
      convertTemperature();
    }
  });

  // Listen for clicks on the 'to' unit selector
  toUnitsSelector.addEventListener("click", (e) => {
    if (e.target.classList.contains("unit-btn")) {
      toUnit = e.target.dataset.unit;
      updateActiveButton(toUnitsSelector, toUnit);
      convertTemperature();
    }
  });

  // Listen for clicks on the swap button
  swapBtn.addEventListener("click", () => {
    // Swap the units
    [fromUnit, toUnit] = [toUnit, fromUnit];

    // Update the UI to reflect the swapped units
    updateActiveButton(fromUnitsSelector, fromUnit);
    updateActiveButton(toUnitsSelector, toUnit);

    // If there is a result, move it to the input field
    const currentResult = parseFloat(toValueDisplay.textContent);
    if (!isNaN(currentResult)) {
      fromValueInput.value = currentResult.toFixed(2);
    }

    // Recalculate the conversion
    convertTemperature();
  });

  // --- Initial Conversion ---
  // Perform an initial conversion when the page loads
  convertTemperature();
});
