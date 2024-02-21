import { useEffect, useState } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { DepartmentProps } from "@/types/DepartmentProps";

const useDepartments = () => {
  // Get a department by department_id (UUID)
  const getDepartment = async (departmentId: string) => {
    try {
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
    }
  };

  // Get all departments that contains the provided user_id (UUID) inside the users_collection (jsonb)
  const getUsersDepartments = async (userId: string) => {
    try {
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
    }
  };

  // Add a department to the departments table
  const addDepartment = async (department: DepartmentProps) => {
    try {
      const { data, error } = await supabase
        .from("departments")
        .insert([department]);

      if (error) {
        throw new Error("Error adding department");
        console.log("Error adding department:", error);
      }

      return data;
    } catch (error) {
      console.log(
        "Try and catch failed when trying to execute addDepartment",
        error,
      );
    }
  };

  // Update a department in the departments table
  const updateDepartment = async (department: DepartmentProps) => {
    try {
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
    }
  };

  // Delete a department by department_id (UUID) & the user_id (UUID) that is the owner of the department
  const deleteDepartment = async (departmentId: string, userId: string) => {
    try {
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
    }
  };

  return {
    getDepartment,
    getUsersDepartments,
    addDepartment,
  };
};

export default useDepartments;
