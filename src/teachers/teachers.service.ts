import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from 'src/DTOs/create-teacher.dto';
import { supabase } from 'supabase.config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TeachersService {
  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<any> {
    const { username, isactive, idInstitute, email, password, userType } = createTeacherDto;

     // Hasher le mot de passe
     const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage, vous pouvez ajuster selon vos besoins

    // Use Supabase to insert a new user into your table (adjust the table name)
    const { data, error } = await supabase
      .from('TEACHER') // Replace 'users' with your Supabase table name
      .upsert([{ username, isactive, idInstitute, email, password: hashedPassword , userType }]);

    if (error) {
      throw error;
    }

    return data;
  }

  async getAllTeacher(): Promise<any[]> {
    const { data, error } = await supabase.from('TEACHER').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async updateTeacher(id: number, updatedData: any): Promise<any> {
    const { data, error } = await supabase
      .from('TEACHER')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  async getTeacherById(id: number): Promise<any> {
    const { data, error } = await supabase
      .from('TEACHER')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteTeacherById(id: number): Promise<void> {
    const { error } = await supabase.from('TEACHER').delete().eq('id', id);

    if (error) {
      throw error;
    }
  }

  async findOneByEmailTeacher(email: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('TEACHER')
      .select('*')
      .eq('email', email);
  
    if (error) {
      throw error;
    }
  
    return data;
  }

}
