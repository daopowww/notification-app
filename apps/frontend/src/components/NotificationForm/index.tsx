import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { notificationRequestWithAttachment } from "@/schemas";
import { Button } from "@/components/ui/button.tsx";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group.tsx";
import { useState } from "react";
import { sendMessage } from "@/api/sendMessage.ts";
import { createValuesToFormData } from "@/lib/utils.ts";
import { toast } from "@/components/ui/toast";

const formValuesSchema = notificationRequestWithAttachment;

type FormValues = z.infer<typeof formValuesSchema>;

const defaultValues: FormValues = {
  message: "",
  recipient: "",
  title: "",
  attachment: undefined,
};

export const NotificationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formValuesSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const formData = createValuesToFormData(data);

      const response = await sendMessage(formData);

      toast.add({
        type: "success",
        title: "Успешно выполнено",
        description: response.message,
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Произошла неизвестная ошибка",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="grid gap-5"
      id="form-notification"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Controller
        control={control}
        name="recipient"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-notification-recipient">
              Получатель
            </FieldLabel>
            <Input
              {...field}
              className="h-8 px-3 text-base sm:text-sm"
              type="email"
              id="form-notification-recipient"
              aria-invalid={fieldState.invalid}
              placeholder="name@example.com"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-notification-title">
              Тема письма
            </FieldLabel>
            <Input
              {...field}
              className="h-8 px-3 text-base sm:text-sm"
              id="form-notification-title"
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="message"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-auto">
            <FieldLabel htmlFor="form-notification-message">
              Сообщение
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="form-notification-message"
                rows={6}
                placeholder="Введите сообщение"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end" className="justify-end px-3">
                <InputGroupText className="tabular-nums">
                  {field.value.length}/200 символов
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="attachment"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-notification-attachment">
              Вложение
              <span className="text-xs font-normal text-muted-foreground">
                Необязательно
              </span>
            </FieldLabel>
            <Input
              {...field}
              className="h-8 cursor-pointer px-2 py-2 text-sm text-muted-foreground file:mr-3 file:cursor-pointer file:bg-muted file:px-2.5 file:text-foreground"
              value={undefined}
              onChange={(event) =>
                field.onChange(event.target.files && event.target.files[0])
              }
              type="file"
              id="form-notification-attachment"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex justify-end border-t border-border pt-5">
        <Button
          className="h-11 w-full px-5 text-sm sm:w-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Отправляем…" : "Отправить письмо"}
        </Button>
      </div>
    </form>
  );
};
