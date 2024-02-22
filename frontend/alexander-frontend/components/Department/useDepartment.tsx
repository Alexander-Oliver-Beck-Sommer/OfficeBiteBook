import { useEffect, useState } from "react";
import useDepartments from "@/hooks/useDepartments";
import { DepartmentProps } from "@/types/DepartmentProps";
import useUser from "@/hooks/useUser";
import { v4 as uuidv4 } from "uuid";

type Mode = "create" | "edit" | "";

const useDepartment = (userEmail: string, userId: string) => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [name, setName] = useState<string>("");
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
    setDepartmentId(uuidv4());
    setOwnerId(userId);
    setDepartmentStatus("online");
  };

  const editDepartment = async (department: DepartmentProps) => {
    setMode("edit");
    setVisibility(true);
    setDepartmentId(department.department_id);
    setName(department.name);
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
      setLoading(false);
      setDepartmentId("");
      setOwner("");
      setName("");
      setDescription("");
      setDepartmentStatus("");
      setUsersAmount(0);
    }
  }, [visibility]);

  return {
    departments,
    visibility,
    loading,
    closeModal,
    departmentId,
    ownerId,
    owner,
    name,
    createDepartment,
    editDepartment,
    description,
    departmentStatus,
    usersAmount,
    mode,
  };
};

export default useDepartment;
