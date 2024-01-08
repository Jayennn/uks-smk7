import {trpc} from "@/utils/trpc";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {CheckCheck, ChevronLeft, ChevronRight, Loader} from "lucide-react";
import {cn} from "@/lib/utils";
import {useAtom} from "jotai";
import {questions_array} from "@/atom/atoms";
import {OptionReport} from "@/server/api/routers/form/option-form/schema";

const SidebarForm = () => {
  const [questions, setQuestions] = useAtom(questions_array)
  const [search, setSearch] = useState("")
  const [pagination, setPagination] = useState({
    index: 0,
    paginate: 10
  })
  const {data: options} = trpc.form.option.all.useQuery();

  useEffect(() => {
    console.log(questions)
  }, [questions]);

  if(!options?.data) {
    return (
      <>
        <div className={cn("rounded-md border font-poppins bg-white w-full min-h-screen p-4 grid")}>
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Loader size={15} className="animate-spin"/>
            <p className="text-sm font-medium">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  const handlePrevious = () => {
    if(pagination.index <= 0) return;

    setPagination((prev) => ({
      index: prev.index - 10,
      paginate: prev.paginate - 10
    }))
  }

  const handleNext = () => {
    if (options?.data.length <= pagination.paginate) return;

    setPagination((prev) => ({
      index: prev.index + 10,
      paginate: prev.paginate + 10
    }))
  }


  const handleAddQuestions = (option: OptionReport) => {
    setQuestions((prev) => {
      const findSectionParent = prev.find(
        (data) => data.id === option.subbagian_rapor_kesehatan.bagian_rapor_kesehatan.id
      );

      if (findSectionParent) {
        const updatedQuestions = prev.map((section) => {
          if (section.id === option.subbagian_rapor_kesehatan.bagian_rapor_kesehatan.id) {
            const subSectionIsExist = section.sub_sections.find(
              (subSection) => subSection.id === option.subbagian_rapor_kesehatan.id
            );

            return {
              ...section,
              sub_sections: subSectionIsExist
                ? section.sub_sections.map((subSection) =>
                  subSection.id === option.subbagian_rapor_kesehatan.id
                    ? {
                      ...subSection,
                      questions: subSection.questions.some(
                        (question) => question.id === option.id
                      )
                        ? subSection.questions.filter(
                          (question) => question.id !== option.id
                        )
                        : [
                          ...subSection.questions,
                          {
                            id: option.id,
                            question_label: option.pertanyaan,
                          },
                        ],
                    }
                    : subSection
                )
                : [
                  ...section.sub_sections,
                  {
                    id: option.subbagian_rapor_kesehatan.id,
                    sub_section_label: option.subbagian_rapor_kesehatan.label,
                    questions: [
                      {
                        id: option.id,
                        question_label: option.pertanyaan,
                      },
                    ],
                  },
                ],
            };
          } else {
            return section;
          }
        });


        return updatedQuestions
          .filter((section) =>
            section.sub_sections.length > 0 &&
            section.sub_sections.some((sub) => sub.questions.length > 0)
          )
          .map((section) => {
            return {
              ...section,
              sub_sections: section.sub_sections.filter(
                (subSection) => subSection.questions.length > 0
              ),
            }
          });
      }

      // If the section doesn't exist, add a new section
      return [
        ...prev,
        {
          id: option.subbagian_rapor_kesehatan.bagian_rapor_kesehatan.id,
          section_label: option.subbagian_rapor_kesehatan.bagian_rapor_kesehatan.label,
          sub_sections: [
            {
              id: option.subbagian_rapor_kesehatan.id,
              sub_section_label: option.subbagian_rapor_kesehatan.label,
              questions: [
                {
                  id: option.id,
                  question_label: option.pertanyaan,
                },
              ],
            },
          ],
        },
      ];
    });
  };

  const handleSelectAllQuestions = () => {
    console.log(options.data)
    setQuestions([...options.data.map((data) => ({

    }))])
  }

  return (
    <>
      <div className={cn("rounded-md border font-poppins bg-white w-full min-h-screen p-4 flex flex-col")}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-[#1D2739] font-bold">Pilih Bagian</h1>
            <div>
              <div className="flex items-center gap-2" onClick={handleSelectAllQuestions}>
                <input id="select-all" type="checkbox"/>
                <label className="font-semibold text-sm" htmlFor="select-all">Select All</label>
              </div>
            </div>
          </div>
          <div className="h-full flex flex-col gap-2">
            <Input className="text-sm" onChange={(e) => setSearch(e.target.value)} placeholder="Search Questions"/>
            <div className="flex flex-col gap-2">
              {options?.data.filter((option) => option.pertanyaan.toLowerCase().includes(search.toLowerCase())).slice(pagination.index, pagination.paginate).map((option) => (
                <Button
                  onClick={() => handleAddQuestions(option)}
                  variant="outline"
                  key={option.id}
                  className={cn("justify-between border shadow rounded-md p-3")}>
                  <p className="max-w-[15rem] truncate text-xs font-medium">{option.pertanyaan}</p>
                  <CheckCheck size={15} className={cn("opacity-0 text-gray-500",
                    questions.some((data) =>
                      data.sub_sections.some((sub_section) => sub_section.questions.some((question) => question.id === option.id))
                    )
                    && "opacity-100")}/>
                </Button>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between">
              <Button disabled={pagination.index === 0} onClick={handlePrevious} size="sm">
                <span className="sr-only">PREV</span>
                <ChevronLeft size={15}/>
              </Button>
              <Button disabled={options?.data?.length <= pagination.paginate} onClick={handleNext} size="sm">
                <span className="sr-only">NEXT</span>
                <ChevronRight size={15}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default SidebarForm;
