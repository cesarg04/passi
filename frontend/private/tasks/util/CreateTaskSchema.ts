import * as yup from 'yup';


export const createTaskSchema = yup.object().shape({
  title: yup.string().required('El título es obligatorio').default(''),
  description: yup.string().required("La descripcion es obligatoria").default(''),
})

export type TCreateTaskSchema = yup.InferType<typeof createTaskSchema>;
export const createTaskSchemaDefaultValues: TCreateTaskSchema = createTaskSchema.cast({})


