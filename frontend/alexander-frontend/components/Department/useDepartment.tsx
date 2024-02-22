import { useEffect, useState } from "react";
import useDepartments from "@/hooks/useDepartments";
import { DepartmentProps } from "@/types/DepartmentProps";
import useUser from "@/hooks/useUser";

type Mode = "create" | "edit" | "";

const useDepartment = (userEmail: string, userId: string) => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [departmentStatus, setDepartmentStatus] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [usersAmount, setUsersAmount] = useState<number>(0);

  const {
    getDepartment,
    getUsersDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartments();

  const { getUserFromId } = useUser();

  // Fetches the departments that the user is apart of and inserts them into departments state.
  const fetchDepartments = async () => {
    const fetchedDepartments = await getUsersDepartments(userId);
    setDepartments(fetchedDepartments);
  };

  const createDepartment = async (department: DepartmentProps) => {
    setMode("create");
    setVisibility(true);
    setTitle("New Department");
  };

  const editDepartment = async (department: DepartmentProps) => {
    setMode("edit");
    setVisibility(true);
    setDepartmentId(department.department_id);
    setTitle(department.name);
    setDescription(department.description);
    setDepartmentStatus(department.status);
    const user = await getUserFromId(department.owner_id);
    setOwner(user[0].user_name);
    setUsersAmount(department.users_count);
  };

  const closeModal = () => {
    setVisibility(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, [userId]);

  useEffect(() => {
    if (visibility === false) {
      setMode("");
    }
  }, [visibility]);

  return {
    departments,
    visibility,
    loading,
    closeModal,
    departmentId,
    title,
    createDepartment,
    editDepartment,
    description,
    departmentStatus,
    owner,
    usersAmount,
  };
};

export default useDepartment;
