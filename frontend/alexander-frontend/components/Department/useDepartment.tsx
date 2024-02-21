import { useEffect, useState } from "react";
import useDepartments from "@/hooks/useDepartments";
import { DepartmentProps } from "@/types/DepartmentProps";

const useDepartment = (userEmail: string, userId: string) => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const {
    getDepartment,
    getUsersDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartments();

  // Fetches the departments that the user is apart of and inserts them into departments state.
  const fetchDepartments = async () => {
    const fetchedDepartments = await getUsersDepartments(userId);
    setDepartments(fetchedDepartments);
  };

  useEffect(() => {
    fetchDepartments();
  }, [userId]);

  return {
    departments,
  };
};

export default useDepartment;
