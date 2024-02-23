import { useEffect, useState } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { DepartmentProps } from "@/types/DepartmentProps";

const useDepartments = () => {
  const [departmentLoading, setDepartmentsLoading] = useState<boolean>(false);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  // Get a department by department_id (UUID)
  const getDepartment = async (departmentId: string) => {
    try {
      setDepartmentsLoading(true);
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .eq("department_id", departmentId);

      if (error) {
        throw new Error("Error fetching department");
        console.log("Error fetching department:", error);
      }

      return data;
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute getDepartment",
        error,
      );
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Get all departments that contains the provided user_id (UUID) inside the users_collection (jsonb)
  const getUsersDepartments = async (userId: string) => {
    try {
      setDepartmentsLoading(true);
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .contains("users_collection", `["${userId}"]`);

      if (error) {
        throw new Error("Error fetching the users departments");
        console.log("Error fetching the users departments:", error);
      }

      return data;
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute getUsersDepartments",
        error,
      );
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Add a department to the departments table
  const addDepartment = async (department: DepartmentProps) => {
    try {
      setDepartmentsLoading(true);
      const { error } = await supabase.from("departments").insert(department);

      if (error) {
        throw new Error("Error adding department");
        console.log("Error adding department:", error);
      }
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute addDepartment",
        error,
      );
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Update a department in the departments table
  const updateDepartment = async (department: DepartmentProps) => {
    try {
      setDepartmentsLoading(true);
      const { data, error } = await supabase
        .from("departments")
        .update(department)
        .eq("department_id", department.department_id);

      if (error) {
        throw new Error("Error updating department");
        console.log("Error updating department:", error);
      }

      return data;
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute updateDepartment",
        error,
      );
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Delete a department by department_id (UUID) & the user_id (UUID) that is the owner of the department
  const deleteDepartment = async (departmentId: string, userId: string) => {
    try {
      setDepartmentsLoading(true);
      const { error } = await supabase
        .from("departments")
        .delete()
        .match({ department_id: departmentId, owner_id: userId });

      if (error) {
        throw new Error("Error deleting department");
        console.log("Error deleting department:", error);
      }

      console.log(`See you later, ${departmentId}. We’ll miss ya.`);
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute deleteDepartment",
        error,
      );
    } finally {
      setDepartmentsLoading(false);
    }
  };

  const checkIfApartOfDepartment = async (
    departmentId: string,
    userId: string,
  ) => {
    try {
      setDepartmentsLoading(true);
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .eq("department_id", departmentId)
        .contains("users_collection", `["${userId}"]`);

      if (error) {
        throw new Error("Error checking if user is apart of department");
      }

      // Check if the data returned has at least one department matching the criteria
      setIsAllowed(data && data.length > 0);

      return data; // You might want to return something indicating success/failure as well
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute checkIfApartOfDepartment",
        error,
      );
      setIsAllowed(false); // Ensure we set isAllowed to false in case of error
    } finally {
      setDepartmentsLoading(false);
    }
  };

  return {
    getDepartment,
    getUsersDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    departmentLoading,
    checkIfApartOfDepartment,
    isAllowed,
  };
};

export default useDepartments;
