import z from 'zod';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const paginationValidation = z.object({
    pageSize: z.coerce
        .number({
            invalid_type_error: 'invalid_field_format',
            required_error: 'cannot_be_empty'
        })
        .min(0, { message: 'invalid_field_format' }),
    pageNumber: z.coerce
        .number({
            invalid_type_error: 'invalid_field_format',
            required_error: 'cannot_be_empty'
        })
        .min(0, { message: 'invalid_field_format' })
});

export const dateRangeValidation = z.object({
    fromDate: z.coerce
        .string({ required_error: 'cannot_be_empty' })
        .min(1, { message: 'cannot_be_empty' }),
    toDate: z.coerce
        .string({ required_error: 'cannot_be_empty' })
        .min(1, { message: 'cannot_be_empty' })
});

export const createDateRefine = (
    range: number = 7,
    type: 'days' | 'months' = 'days'
) => {
    return {
        range: {
            validator: validateRange(range, type),
            params: {
                message: `maximum|${range}|${type}`,
                path: ['toDate']
            }
        },
        valid: {
            validator: validateDate,
            params: {
                message: 'invalid_from_date',
                path: ['fromDate']
            }
        }
    };
};

/**
 *
 * @param range
 * @returns
 */
const validateRange = (range: number, type: 'days' | 'months') => {
    return ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
        const _fromDate = dayjs(fromDate, 'DD-MM-YYYY');
        const _toDate = dayjs(toDate, 'DD-MM-YYYY');

        return type === 'days'
            ? _toDate.diff(_fromDate, type, true) < range
            : _toDate.diff(_fromDate, type, true) <= range;
    };
};

const validateDate = ({
    fromDate,
    toDate
}: {
    fromDate: string;
    toDate: string;
}) => {
    const _fromDate = dayjs(fromDate, 'DD-MM-YYYY');
    const _toDate = dayjs(toDate, 'DD-MM-YYYY');

    return _fromDate <= _toDate;
};
