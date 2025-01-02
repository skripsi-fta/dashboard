import {
    reportPharmacyCashierValidation,
    type ReportPharmacyCashierValidation
} from '@/infrastructure/models/management/report';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormFooter,
    type FormProps,
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields
} from '@/presentation/layout/modal-form';
import { Label } from '@/presentation/ui/label';
import { RadioGroup, RadioGroupItem } from '@/presentation/ui/radio-group';
import { monthDropdownData } from '@/shared/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const FilterModalPharmacyCashier = ({
    onSubmit,
    defaultValues,
    onCancel
}: FormProps<ReportPharmacyCashierValidation>) => {
    const { control, handleSubmit, watch, setValue } =
        useForm<ReportPharmacyCashierValidation>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(reportPharmacyCashierValidation)
        });

    const type = watch('type');

    return (
        <ModalFormContainer formProps={{ onSubmit: handleSubmit(onSubmit) }}>
            <ModalFormContent>
                <ModalFormFields>
                    <RadioGroup
                        value={type}
                        onValueChange={(e) => setValue('type', e)}
                    >
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='range' id='range' />
                                <Label htmlFor='range' className='text-lg'>
                                    Rentang Tanggal
                                </Label>
                            </div>
                            {type === 'range' && (
                                <>
                                    <div className='mb-2 flex w-full flex-row justify-center gap-4'>
                                        <DatePickerSingleInput
                                            control={control}
                                            name='startDate'
                                            label='Tanggal Mulai'
                                        />

                                        <DatePickerSingleInput
                                            control={control}
                                            name='endDate'
                                            label='Tanggal Akhir'
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='weekly' id='weekly' />
                                <Label htmlFor='weekly' className='text-lg'>
                                    Minggu
                                </Label>
                            </div>
                            {type === 'weekly' && (
                                <>
                                    <div className='mb-2 flex w-full flex-row justify-center gap-4'>
                                        <DatePickerSingleInput
                                            control={control}
                                            name='startDate'
                                            label='Tanggal Mulai'
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='monthly' id='monthly' />
                                <Label htmlFor='monthly' className='text-lg'>
                                    Bulan
                                </Label>
                            </div>
                            {type === 'monthly' && (
                                <div className='mb-2 flex w-full flex-row gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name='month'
                                            render={({
                                                field: { ref, ...field },
                                                fieldState: { error }
                                            }) => (
                                                <CustomSelectInput
                                                    {...field}
                                                    placeholder='Pilih Bulan'
                                                    data={monthDropdownData}
                                                    noDataNotice='Data tidak ditemukan'
                                                    error={error}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name='year'
                                            render={({
                                                field: { ref, ...field },
                                                fieldState: { error }
                                            }) => (
                                                <TextFieldInput
                                                    {...field}
                                                    placeholder='Tahun'
                                                    error={error}
                                                    variant='modal'
                                                    type='number'
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='yearly' id='yearly' />
                                <Label htmlFor='yearly' className='text-lg'>
                                    Tahun
                                </Label>
                            </div>
                            {type === 'yearly' && (
                                <>
                                    <Controller
                                        control={control}
                                        name='year'
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error }
                                        }) => (
                                            <TextFieldInput
                                                {...field}
                                                placeholder='Tahun'
                                                error={error}
                                                variant='modal'
                                                type='number'
                                                fullWidth
                                            />
                                        )}
                                    />
                                </>
                            )}
                        </div>
                    </RadioGroup>
                </ModalFormFields>
                <ModalFormFooter type='filter' onCancel={onCancel} />
            </ModalFormContent>
        </ModalFormContainer>
    );
};

export default FilterModalPharmacyCashier;
