"use client"
import { MainSearchModel, mainSearchSchema } from '@/schema/main-search-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './Form/Input';
import Select from './Form/Select';
import { useRouter } from 'next/navigation';
import { objectToQueryString } from '@/utils/objectToQueryString';

const defaultValue: MainSearchModel = {
    adType: "Buy",
    state: "",
    township: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 100000
}

const adTypeOptions = [{ label: "Buy", value: "Buy" }, { label: "Rent", value: "Rent" }];

type Props = {
    locations: Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>,
    propertyTypes: Array<{ label: string, value: string }>,
}

const MainSearchForm: React.FC<Props> = ({ locations, propertyTypes }) => {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: defaultValue,
        resolver: zodResolver(mainSearchSchema)
    });

    const onSubmit: SubmitHandler<MainSearchModel> = (data) => {
        const query = objectToQueryString(data);
        router.push("/properties?" + query);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-600 rounded-sm p-4 my-20 sm:mx-2 md:mx-20 xl:mx-40" noValidate>
            <div className='flex max-md:flex-col max-md:items-stretch items-center justify-stretch gap-2'>
                <div className="flex-1">
                    <Select id='adType' name='adType' label='Rent or Buy' options={adTypeOptions} register={register} required={true} error={errors?.adType?.message || ""} placeholder='Rent or Buy' disabled={false} />
                </div>
                <div className="flex-1">
                    <Select id='state' name='state' label='Select State' options={locations || []} register={register} required={false} error={errors?.state?.message || ""} placeholder='Select State' disabled={false} />
                </div>
                <div className="flex-1">
                    <Select id='township' name='township' label='Select Township' options={locations?.find(ld => ld.value === watch("state"))?.townships || []} register={register} required={false} error={errors?.township?.message || ""} placeholder='Select Township' disabled={watch("state") === ""} />
                </div>
                <div className="flex-1">
                    <Select id='propertyType' name='propertyType' label='Type of Property' options={propertyTypes} register={register} required={false} error={errors?.propertyType?.message || ""} placeholder='Select Property Type' disabled={false} />
                </div>
            </div>
            <div className='flex max-md:flex-col max-md:items-stretch items-center justify-stretch gap-2'>
                <div className="flex-1">
                    <Input id='minPrice' name='minPrice' label='Minimum Price' register={register} required={false} error={errors?.minPrice?.message || ""} placeholder='Enter Min Price' disabled={false} type='number' />
                </div>
                <div className="flex-1">
                    <Input id='maxPrice' name='maxPrice' label='Maximum Price' register={register} required={false} error={errors?.maxPrice?.message || ""} placeholder='Enter Max Price' disabled={false} type='number' />
                </div>
                <div className="flex-1">
                </div>
                <div className="flex-1">
                    <button type='submit' className='w-full bg-sky-600 rounded-sm p-2.5 text-white'>Search</button>
                </div>
            </div>
        </form>
    )
}

export default MainSearchForm