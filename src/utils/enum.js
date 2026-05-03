const ROLES = Object.freeze({
  TEACHER: "teacher",
  PRINCIPAL: "principal",
  STUDENT: "student",
});

const CONTENT_STATUS = Object.freeze({
  PENDING :"pending",
  APPROVED :"approved",
  REJECTED : "rejected"
})

module.exports = {
  ROLES,
  CONTENT_STATUS
}