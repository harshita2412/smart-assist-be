const getAIPriority = async (description) => {
  if (!description) return "LOW";

  if (description.includes("urgent")) return "HIGH";
  if (description.includes("important")) return "MEDIUM";

  return "LOW";
};

module.exports = { getAIPriority };