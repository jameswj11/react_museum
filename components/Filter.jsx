const Filter = (props) => {
  let labelOptions = { century: {}, division: [], culture: [], medium: [] };

  props.paintings.forEach((painting) => {
    if (Object.keys(labelOptions.century).includes(painting.century)) {
      labelOptions.century[painting.century]++;
    } else {
        if (painting.century == 'null' || painting.century == undefined) {
            labelOptions.century["N/A"] = 1;
        } else {
            labelOptions.century[painting.century] = 1;
        }
    }

    if (Object.keys(labelOptions.division).includes(painting.division)) {
      labelOptions.division[painting.division]++;
    } else {
        if (painting.division == 'null' || painting.division == undefined) {
            labelOptions.division["N/A"] = 1;
        } else {
            labelOptions.division[painting.division] = 1;
        }
    }

    if (Object.keys(labelOptions.culture).includes(painting.culture)) {
      labelOptions.culture[painting.culture]++;
    } else {
        if (painting.culture == 'null' || painting.culture == undefined) {
            labelOptions.culture["N/A"] = 1;
        } else {
            labelOptions.culture[painting.culture] = 1;
        }
    }

    if (Object.keys(labelOptions.medium).includes(painting.medium)) {
      labelOptions.medium[painting.medium]++;
    } else {
        if (painting.medium == 'null' || painting.medium == undefined) {
            labelOptions.medium["N/A"] = 1;
        } else {
            labelOptions.medium[painting.medium] = 1;
        }
    }
  });

  console.log(labelOptions);
  return (
    <div>
      <select name="centuryFilter" id="centuryFilter">
        {Object.keys(labelOptions.century).map((e) => (
          <option htmlFor="centurySelect" key={e}>
            {e + " (" + labelOptions.century[e] + ")"}
          </option>
        ))}
      </select>

      <select name="divisionFilter" id="divisionFilter">
        {Object.keys(labelOptions.division).map((e) => (
          <option htmlFor="divisionSelect" key={e}>
            {e + " (" + labelOptions.division[e] + ")"}
          </option>
        ))}
      </select>

      <select name="cultureFilter" id="cultureFilter">
        {Object.keys(labelOptions.culture).map((e) => (
          <option htmlFor="cultureSelect" key={e}>
            {e + " (" + labelOptions.culture[e] + ")"}
          </option>
        ))}
      </select>

      <select name="mediumFilter" id="mediumFilter">
        {Object.keys(labelOptions.medium).map((e) => (
          <option htmlFor="mediumSelect" key={e}>
            {e + " (" + labelOptions.medium[e] + ")"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
