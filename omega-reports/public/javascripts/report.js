          function drawOverviewTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Hours');
            data.addRows(employees.length);

            for(var i=0; i<employees.length; i++)
            {
              data.setCell(i, 0, employees[i].name);
              data.setCell(i, 1, employees[i].total_hours);
            }

            var table = new google.visualization.Table(document.getElementById('table_div_1'));
            table.draw(data, {showRowNumber: true});
          }

          function drawPositionTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Position');
            data.addColumn('number', 'Hours');

            var eid = $("#select_employees").val();
            var jobs = employees[eid].jobs
            data.addRows(jobs.length);

            for(var i=0; i<jobs.length; i++)
            {
              data.setCell(i, 0, jobs[i].position_name);
              data.setCell(i, 1, jobs[i].hour);
            }

            var table = new google.visualization.Table(document.getElementById('table_div_2'));
            table.draw(data, {showRowNumber: true});
          }

          function drawEmployeeTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Hours');

            var pid = $("#select_positions").val();
            var jobs = positions[pid].jobs;
            data.addRows(jobs.length);

            for(var i=0; i<jobs.length; i++)
            {
              data.setCell(i, 0, jobs[i].employee_name);
              data.setCell(i, 1, jobs[i].hour);
            }

            var table = new google.visualization.Table(document.getElementById('table_div_3'));
            table.draw(data, {showRowNumber: true});
          }