import { PredictedFileOutput } from '../../src/types/predictedFileOutput';

export const data: PredictedFileOutput = {
  id: '123test',
  automated: false,
  documents: [
    {
      automated: false,
      classification: {
        automated: true,
        confidence: 95,
        document_type: 'e-mail',
        end_page: 0,
        start_page: 0,
      },
      header_fields: {
        email_address: {
          automated: true,
          confidence: 95,
          page: 0,
          text: 'capture@parble.com',
          value: 'capture@parble.com',
        },
        email_date: {
          automated: false,
          confidence: 70,
          page: 0,
          text: 'Wed,23 Nov 2022 09:23:26 +0000',
          value: '2022-11-23',
        },
        email_receiver: {
          automated: true,
          confidence: 95,
          page: 0,
          text: 'capture@parble.com',
          value: 'capture@parble.com',
        },
        email_subject: {
          automated: true,
          confidence: 100,
          page: 0,
          text: '',
          value: '',
        },
      },
      line_items: {},
    },
    {
      automated: false,
      classification: {
        automated: true,
        confidence: 94,
        document_type: 'national_id',
        end_page: 1,
        start_page: 1,
      },
      header_fields: {
        id_birth_date: {
          automated: true,
          confidence: 100,
          page: 1,
          text: '28 02 1995',
          value: '1995-02-28',
        },
        id_card_number: {
          automated: true,
          confidence: 83,
          page: 1,
          text: '000-0003872-89',
          value: '000000387289',
        },
        id_first_name: {
          automated: true,
          confidence: 90,
          page: 1,
          text: 'Specimen',
          value: 'Specimen',
        },
        id_gender: {
          automated: false,
          confidence: 8,
          page: 1,
          text: 'F',
          value: 'F',
        },
        id_nationality: {
          automated: true,
          confidence: 90,
          page: 1,
          text: 'D',
          value: 'DEU',
        },
      },
      line_items: {},
    },
  ],
  filename: 'bundle_eml.pdf',
  number_of_pages: 2,
  timings: {
    done: new Date(),
    upload: new Date(),
  },
};
