import { supabase } from "./supabase";

export async function castVote(
  studentId: string,
  candidateId: string,
  category: string
) {
  try {
    // 1. Check if student already voted in this category
    const votedField = getVotedField(category);

    const { data: student, error: studentErr } = await supabase
      .from("students")
      .select(votedField)
      .eq("id", studentId)
      .single();

    if (studentErr) throw studentErr;

    if (student[votedField] === true) {
      return { success: false, message: `You already voted for ${category}` };
    }

    // 2. Insert into votes table
    const { error: voteErr } = await supabase.from("votes").insert({
      student_id: studentId,
      candidate_id: candidateId,
      category,
    });

    if (voteErr) throw voteErr;

    // 3. Update student voted field
    const { error: updateErr } = await supabase
      .from("students")
      .update({ [votedField]: true })
      .eq("id", studentId);

    if (updateErr) throw updateErr;

    return { success: true, message: "Vote submitted successfully!" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

function getVotedField(category: string) {
  switch (category) {
    case "King":
      return "voted_king";
    case "Queen":
      return "voted_queen";
    case "Prince":
      return "voted_prince";
    case "Princess":
      return "voted_princess";
    case "Innocent":
      return "voted_innocent";
    default:
      throw new Error("Invalid category");
  }
}
